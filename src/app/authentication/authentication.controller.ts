import bcrypt from "bcrypt";
import { Request, Response } from "express";

import AuthenticationService from "@/app/authentication/authentication.service";
import {
	UserChangePasswordSchema,
	UserPasswordResetSchema,
	UserRegisterSchema,
	UserReverificationSchema,
	UserVerificationSchema,
	UsernameLoginSchema,
	UsernameLoginWithOTPSchema
} from "@/app/authentication/authentication.validator";

import { ApiController } from "@/controllers/base/api.controller";
import { TOKEN_LIST } from "@/databases/drizzle/lists";
import { UserSchemaType } from "@/databases/drizzle/types";
import CookieService from "@/service/cookieService";
import sendEmail from "@/service/emailService";
import OTPService from "@/service/otpService";
import { ServiceApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class AuthenticationController extends ApiController {
	protected authenticationService: AuthenticationService;
	protected otpService: OTPService;
	protected cookieService: CookieService;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.authenticationService = new AuthenticationService();
		this.otpService = new OTPService();
		this.cookieService = new CookieService(request, response);
	}

	async register(): Promise<Response> {
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

			const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.EMAIL_VERIFICATION);

			if (otp && user.data.email) {
				sendEmail({
					email: user.data.email,
					emailSubject: "Your account verification OTP",
					template: "otpEmailTemplate",
					data: {
						username: user.data.username,
						otp,
						otpExpirationTime: 5
					}
				});
			}

			return this.apiResponse.sendResponse(user);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithUsername(): Promise<Response | undefined> {
		try {
			const body = this.getReqBody();
			const check = UsernameLoginSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));
			}

			const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
			await this.authenticationService.checkAccountVerification(user.data.id);
			await this.authenticationService.passwordChecker(check.data.password, user.data.password);

			const { password, ...userData } = user.data;

			const accessToken = await this.cookieService.saveCookieToBrowser(userData);

			// Log the user in to establish session
			this.request.login(user.data, err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Login failed"
					});
				}

				const { password, ...userData } = user.data;

				return this.apiResponse.successResponse("Login successful", {
					user: userData,
					token: accessToken
				});
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithUsernameAndOTP(): Promise<Response | undefined> {
		try {
			const body = this.getReqBody();
			const check = UsernameLoginWithOTPSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));
			}

			const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);
			await this.authenticationService.checkAccountVerification(user.data.id);
			await this.authenticationService.passwordChecker(check.data.password, user.data.password);

			const { password, ...userData } = user.data;

			await this.otpService.verifyOTPFromDatabase(
				userData,
				String(check.data.otp),
				TOKEN_LIST.LOGIN_OTP
			);

			const accessToken = await this.cookieService.saveCookieToBrowser(userData);

			// Log the user in to establish session
			this.request.login(user.data, err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Login failed"
					});
				}

				const { password, ...userData } = user.data;

				return this.apiResponse.successResponse("Login successful", {
					user: userData,
					token: accessToken
				});
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async loginWithGoogle(): Promise<Response | void> {
		try {
			const user = this.request.user;

			await this.cookieService.saveCookieToBrowser(user!);

			const appUrl = process.env.APP_URL + "?success=Google";

			return this.response.redirect(appUrl);

			// return this.apiResponse.successResponse("Login successful", {
			// 	user: user,
			// 	token: accessToken
			// });
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async logout(): Promise<Response | undefined> {
		try {
			this.request.session.destroy(err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Error logging out"
					});
				}
				this.cookieService.clearCookieFromBrowser();
				return this.apiResponse.successResponse("Logged out");
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async getSession(): Promise<Response> {
		try {
			const { user } = this.request;
			if (!user) return this.apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");

			return this.apiResponse.successResponse("Authorized", user);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async verifySession(): Promise<Response> {
		try {
			return this.apiResponse.successResponse("Authorized");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async checkAccountVerification(): Promise<Response> {
		try {
			const { user } = this.request;

			if (!user?.emailVerified) {
				this.request.session.destroy(err => {
					if (err) {
						return this.apiResponse.sendResponse({
							status: status.HTTP_500_INTERNAL_SERVER_ERROR,
							message: "Error logging out"
						});
					}
					this.cookieService.clearCookieFromBrowser();
					return this.apiResponse.unauthorizedResponse("Unauthorized: Account is not verified");
				});
				return this.apiResponse.unauthorizedResponse("Unauthorized: Account is not verified");
			}

			return this.apiResponse.successResponse("User is verified");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async checkUser(): Promise<Response> {
		try {
			const { body } = this.request;
			const check = UsernameLoginSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);

			await this.authenticationService.passwordChecker(check.data.password, user.data.password);

			if (check.data.otp) {
				await this.authenticationService.checkAccountVerification(user.data.id);
				const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.LOGIN_OTP);

				if (otp && user.data.email) {
					sendEmail({
						email: user.data.email,
						emailSubject: "Login OTP",
						template: "otpEmailTemplate",
						data: {
							username: user.data.username,
							otp,
							otpExpirationTime: 5
						}
					});
				}
			}

			return this.apiResponse.successResponse("User found");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async verifyUser(): Promise<Response> {
		try {
			const { body } = this.request;
			const check = UserVerificationSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);

			await this.otpService.verifyOTPFromDatabase(
				user.data,
				String(check.data.otp),
				TOKEN_LIST.EMAIL_VERIFICATION
			);
			await this.authenticationService.accountVerification(user.data.id);

			return this.apiResponse.successResponse("User verified");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async resetPassword(): Promise<Response> {
		try {
			const { body } = this.request;
			if (!body.email) return this.apiResponse.badResponse("Email is required");

			const user = await this.authenticationService.findUserByEmail(body.email);

			const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.PASSWORD_RESET);

			if (otp && user.data.email) {
				sendEmail({
					email: user.data.email,
					emailSubject: "Your password reset OTP",
					template: "otpEmailTemplate",
					data: {
						username: user.data.username,
						otp,
						otpExpirationTime: 5
					}
				});
			}

			return this.apiResponse.successResponse("Password reset OTP sent");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async resetPasswordConfirm(): Promise<Response> {
		try {
			const { body } = this.request;
			const check = UserPasswordResetSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByEmail(check.data.email);

			await this.otpService.verifyOTPFromDatabase(
				user.data,
				String(check.data.otp),
				TOKEN_LIST.PASSWORD_RESET
			);
			await this.authenticationService.changePassword(user.data.id, check.data.password);

			return this.apiResponse.successResponse("User password reset");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async changePassword(): Promise<Response> {
		try {
			const { body, user: UserData } = this.request;
			const check = UserChangePasswordSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserById(UserData?.id!, true);

			await this.authenticationService.passwordChecker(check.data.oldPassword, user.data.password);
			const response = await this.authenticationService.changePassword(
				user.data.id,
				check.data.newPassword
			);

			return this.apiResponse.sendResponse(response);
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}

	async requestOTPForUnverifiedUser() {
		try {
			const { body } = this.request;
			const check = UserReverificationSchema.safeParse(body);
			if (!check.success)
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));

			const user = await this.authenticationService.findUserByUsernameOrEmail(check.data.username);

			if (user.data.emailVerified) return this.apiResponse.badResponse("User is already verified");

			const otp = await this.otpService.saveOTPToDatabase(user.data, TOKEN_LIST.EMAIL_VERIFICATION);

			if (otp && user.data.email) {
				sendEmail({
					email: user.data.email,
					emailSubject: "Your account verification OTP",
					template: "otpEmailTemplate",
					data: {
						username: user.data.username,
						otp,
						otpExpirationTime: 5
					}
				});
			}

			return this.apiResponse.successResponse("OTP sent");
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
