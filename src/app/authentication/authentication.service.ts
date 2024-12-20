import bcrypt from "bcrypt";
import { and, eq } from "drizzle-orm";
import { Profile as GoogleUserProfile } from "passport-google-oauth20";

import { sessionTimeout } from "@/core/constants";
import DrizzleService from "@/databases/drizzle/service";
import { UserSchemaType } from "@/databases/drizzle/types";
import { accounts, users } from "@/models/drizzle/authentication.model";
import OTPEmailService from "@/service/otpService";
import AppHelpers from "@/utils/appHelpers";
import { ServiceResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class AuthenticationService extends DrizzleService {
	protected otpService: OTPEmailService;

	/**
	 * Constructor for AuthenticationService
	 */
	constructor() {
		super();
		this.otpService = new OTPEmailService();
	}

	async createUser(data: Omit<UserSchemaType, "id" | "role" | "createdAt" | "updatedAt">) {
		try {
			data.username && (await this.duplicateUserCheckByUsername(data.username));
			data.email && (await this.duplicateUserCheckByEmail(data.email));
			const createdUser = await this.db.insert(users).values(data).returning();

			const { password, ...user } = createdUser[0];

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"User created successfully",
				user
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async createGoogleAccount(userId: number, data: GoogleUserProfile, accessToken: string) {
		try {
			const createdGoogleAccount = await this.db
				.insert(accounts)
				.values({
					userId,
					type: "oauth",
					provider: "google",
					providerAccountId: data.id,
					accessToken: accessToken,
					refreshToken: null,
					expiresAt: sessionTimeout,
					tokenType: "access_token",
					scope: "profile",
					idToken: data.id,
					sessionState: null
				})
				.returning();

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"Google account created successfully",
				createdGoogleAccount[0]
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async createUserFromGoogle(data: GoogleUserProfile, accessToken: string) {
		try {
			const checkUserExistence = await this.db.query.users.findFirst({
				where: eq(users.email, data._json.email!),
				with: {
					accounts: {
						where: and(eq(accounts.providerAccountId, data.id), eq(accounts.provider, "google"))
					}
				}
			});

			// If user exists
			if (checkUserExistence) {
				// If user has a google account, update the access token
				if (checkUserExistence.accounts.length > 0) {
					await this.db
						.update(accounts)
						.set({ accessToken })
						.where(eq(accounts.providerAccountId, data.id));

					if (!checkUserExistence.emailVerified)
						await this.accountVerification(checkUserExistence.id);

					const { accounts: userAccounts, ...user } = checkUserExistence;

					return ServiceResponse.createResponse(
						status.HTTP_200_OK,
						"Google account updated successfully",
						user
					);
				} else {
					// If user does not have a google account, create one
					await this.createGoogleAccount(checkUserExistence.id, data, accessToken);

					const { accounts: userAccounts, ...user } = checkUserExistence;

					return ServiceResponse.createResponse(
						status.HTTP_201_CREATED,
						"Google account created successfully",
						user
					);
				}
			}

			// If user does not exist, create a new user
			const createdUser = await this.createUser({
				name: data._json.name!,
				email: data._json.email!,
				username: data._json.email!.split("@")[0],
				password: null,
				emailVerified: new Date(),
				image: data._json.picture!
			});

			// Create google account
			await this.createGoogleAccount(createdUser.data?.id!, data, accessToken);

			return ServiceResponse.createResponse(
				status.HTTP_201_CREATED,
				"User created successfully",
				createdUser.data
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserByUsernameOrEmail(username: string) {
		try {
			const inputType = AppHelpers.detectInputType(username);

			let findUser: Partial<Omit<UserSchemaType, "password">> = {};

			if (inputType === "EMAIL") {
				const user = await this.findUserByEmail(username, true);
				findUser = user.data!;
				return ServiceResponse.createResponse(
					status.HTTP_200_OK,
					"User found successfully",
					findUser as UserSchemaType
				);
			} else if (inputType === "USERNAME") {
				const user = await this.findUserByUsername(username, true);
				findUser = user.data!;
				return ServiceResponse.createResponse(
					status.HTTP_200_OK,
					"User found successfully",
					findUser as UserSchemaType
				);
			}
			return ServiceResponse.createResponse(
				status.HTTP_400_BAD_REQUEST,
				"Invalid input type",
				findUser as UserSchemaType
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserById(id: number, withPassword: boolean = false) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.id, id)
			});

			if (!user)
				return ServiceResponse.createResponse(status.HTTP_404_NOT_FOUND, "User not found", user);

			if (withPassword)
				return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);

			const { password, ...userData } = user;

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"User found successfully",
				userData as UserSchemaType
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserByEmail(email: string, withPassword: boolean = false) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.email, email)
			});

			if (!user)
				return ServiceResponse.createResponse(status.HTTP_404_NOT_FOUND, "User not found", user);

			if (withPassword)
				return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);

			const { password, ...userData } = user;

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"User found successfully",
				userData as UserSchemaType
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async findUserByUsername(username: string, withPassword: boolean = false) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.username, username)
			});

			if (!user)
				return ServiceResponse.createResponse(status.HTTP_404_NOT_FOUND, "User not found", user);

			if (withPassword)
				return ServiceResponse.createResponse(status.HTTP_200_OK, "User found successfully", user);

			const { password, ...userData } = user;

			return ServiceResponse.createResponse(
				status.HTTP_200_OK,
				"User found successfully",
				userData as UserSchemaType
			);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async duplicateUserCheckByEmail(email: string) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.email, email)
			});

			if (user)
				return ServiceResponse.createResponse(
					status.HTTP_409_CONFLICT,
					"User already exists",
					true
				);

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User does not exist", false);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async duplicateUserCheckByUsername(username: string) {
		try {
			const user = await this.db.query.users.findFirst({
				where: eq(users.username, username)
			});

			if (user)
				return ServiceResponse.createResponse(
					status.HTTP_409_CONFLICT,
					"User already exists",
					true
				);

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User does not exist", false);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async passwordChecker(password: string, hashedPassword: string | null) {
		try {
			if (!hashedPassword) {
				return ServiceResponse.createResponse(
					status.HTTP_400_BAD_REQUEST,
					"User account has no password",
					false
				);
			}
			const check = await bcrypt.compare(password, hashedPassword);

			if (!check)
				return ServiceResponse.createResponse(
					status.HTTP_400_BAD_REQUEST,
					"Password incorrect",
					check
				);

			return ServiceResponse.createResponse(status.HTTP_200_OK, "Password checked", check);
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async accountVerification(id: number) {
		try {
			await this.db
				.update(users)
				.set({
					emailVerified: new Date()
				})
				.where(eq(users.id, id));

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User verified");
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async checkAccountVerification(id: number) {
		try {
			const user = await this.findUserById(id);

			if (!user.data?.emailVerified)
				return ServiceResponse.createResponse(status.HTTP_400_BAD_REQUEST, "User is not verified");

			return ServiceResponse.createResponse(status.HTTP_200_OK, "User is verified");
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}

	async changePassword(id: number, newPassword: string) {
		try {
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			await this.db
				.update(users)
				.set({
					password: hashedPassword
				})
				.where(eq(users.id, id));

			return ServiceResponse.createResponse(status.HTTP_200_OK, "Password changed successfully");
		} catch (error) {
			return ServiceResponse.createErrorResponse(error);
		}
	}
}
