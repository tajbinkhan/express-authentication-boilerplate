import bcrypt from "bcrypt";
import { Request, Response } from "express";

import { encode } from "@/app/authentication/authentication.JWT";
import AuthenticationService from "@/app/authentication/authentication.service";
import {
	UserChangePasswordSchema,
	UserPasswordResetSchema,
	UserRegisterSchema,
	UserVerificationSchema,
	UsernameLoginSchema,
	UsernameLoginWithOTPSchema
} from "@/app/authentication/authentication.validator";

import { ApiController } from "@/controllers/base/api.controller";
import { UserSchemaType } from "@/databases/drizzle/types";
import AppHelpers from "@/utils/appHelpers";
import { ServiceApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class AuthenticationController extends ApiController {
	protected authenticationService: AuthenticationService;
	protected jwtCookieName: string;
	protected sessionCookieName: string;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.authenticationService = new AuthenticationService();
		this.jwtCookieName = process.env.JWT_COOKIE_NAME;
		this.sessionCookieName = process.env.SESSION_COOKIE_NAME;
	}

	async saveCookieToBrowser(user: Omit<UserSchemaType, "password">) {
		try {
			const accessToken = await encode({
				token: user
			});

			this.response.cookie(this.jwtCookieName, accessToken, {
				httpOnly: true,
				maxAge: AppHelpers.sessionTimeout,
				sameSite: "strict"
			});

			return Promise.resolve(accessToken);
		} catch (error) {
			return Promise.resolve(null);
		}
	}

	async register() {
		try {
			const body = this.getReqBody();
			const check = UserRegisterSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const extendedData: Omit<UserSchemaType, "id" | "role" | "createdAt" | "updatedAt"> = {
				...check.data,
				image: null,
				emailVerified: null,
				password: bcrypt.hashSync(check.data.password, 10)
			};

			const user = await this.authenticationService.createUser(extendedData);

			await this.authenticationService.requestRegisterOTP(user.data!);

			return this.apiResponse.sendResponse(user);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithUsername() {
		try {
			const body = this.getReqBody();
			const check = UsernameLoginSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));
			}

			const user = await this.authenticationService.findUserByUsernameOrEmail(
				check.data.username,
				check.data.password
			);

			const accessToken = await this.saveCookieToBrowser(user?.data!);

			// Log the user in to establish session
			this.request.login(user?.data!, err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Login failed"
					});
				}

				const { password, ...userData } = user?.data!;

				return this.apiResponse.successResponse("Login successful", {
					user: userData,
					token: accessToken
				});
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithUsernameAndOTP() {
		try {
			const body = this.getReqBody();
			const check = UsernameLoginWithOTPSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));
			}

			const user = await this.authenticationService.findUserByUsernameOrEmail(
				check.data.username,
				check.data.password
			);

			await this.authenticationService.verifyLoginOTP(user.data!, check.data.otp);

			const accessToken = await this.saveCookieToBrowser(user?.data!);

			// Log the user in to establish session
			this.request.login(user?.data!, err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Login failed"
					});
				}

				const { password, ...userData } = user?.data!;

				return this.apiResponse.successResponse("Login successful", {
					user: userData,
					token: accessToken
				});
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithGoogle() {
		try {
			const user = this.request.user;

			await this.saveCookieToBrowser(user!);

			return this.response.redirect(process.env.APP_URL);

			// return this.apiResponse.successResponse("Login successful", {
			// 	user: user,
			// 	token: accessToken
			// });
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async logout() {
		try {
			this.request.session.destroy(err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Error logging out"
					});
				}
				this.response.clearCookie(this.jwtCookieName);
				this.response.clearCookie(this.sessionCookieName);
				return this.apiResponse.successResponse("Logged out");
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async getSession() {
		try {
			const user = this.request.user;
			if (!user) return this.apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");

			return this.apiResponse.successResponse("Authorized", user);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async checkUser() {
		try {
			const { body } = this.request;
			const check = UsernameLoginSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByUsernameOrEmail(
				check.data.username,
				check.data.password
			);

			if (check.data.otp) {
				await this.authenticationService.requestLoginOTP(user.data!);
			}

			return this.apiResponse.successResponse("User found");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async verifyUser() {
		try {
			const { body } = this.request;
			const check = UserVerificationSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByEmail(check.data.email);

			await this.authenticationService.verifyRegisterOTP(user.data!, check.data.otp);
			await this.authenticationService.accountVerification(user.data?.id!);

			return this.apiResponse.successResponse("User verified");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async resetPassword() {
		try {
			const { body } = this.request;
			if (!body.email) return this.apiResponse.badResponse("Email is required");

			const user = await this.authenticationService.findUserByEmail(body.email);

			await this.authenticationService.requestResetPasswordOTP(user.data!);

			return this.apiResponse.successResponse("Password reset OTP sent");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async resetPasswordConfirm() {
		try {
			const { body } = this.request;
			const check = UserPasswordResetSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByEmail(check.data.email);

			await this.authenticationService.verifyResetPasswordOTP(user.data!, check.data.otp);
			await this.authenticationService.changePassword(user.data?.id!, check.data.password);

			return this.apiResponse.successResponse("User password reset");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async changePassword() {
		try {
			const { body, user: UserData } = this.request;
			const check = UserChangePasswordSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserById(UserData?.id!, true);

			await this.authenticationService.passwordChecker(
				check.data.oldPassword,
				user.data?.password!
			);
			const response = await this.authenticationService.changePassword(
				user.data?.id!,
				check.data.newPassword
			);

			return this.apiResponse.sendResponse(response);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
