import { Request, Response } from "express";

import { encode } from "@/app/authentication/authentication.JWT";
import AuthenticationService from "@/app/authentication/authentication.service";
import { UsernameLoginSchema } from "@/app/authentication/authentication.validator";

import { ApiController } from "@/controllers/base/api.controller";
import { UserSchemaType } from "@/databases/drizzle/types";
import AppHelpers from "@/utils/appHelpers";
import { ServiceApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default class AuthenticationController extends ApiController {
	protected authenticationService: AuthenticationService;
	protected jwtCookieName: string;

	/**
	 * Construct the controller
	 *
	 * @param request
	 * @param response
	 */
	constructor(request: Request, response: Response) {
		super(request, response);
		this.authenticationService = new AuthenticationService();
		this.jwtCookieName = process.env.SESSION_COOKIE_NAME;
	}

	async saveCookieToBrowser(user: UserSchemaType) {
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

	async loginWithUsername() {
		try {
			const body = this.getReqBody();
			const check = UsernameLoginSchema.safeParse(body);
			if (!check.success) {
				return this.apiResponse.badResponse(check.error.errors.map(err => err.message).join(", "));
			}

			const inputType = AppHelpers.detectInputType(check.data.username);

			let findUser: any = null;

			if (inputType === "EMAIL") {
				const user = await this.authenticationService.findUserByEmail(check.data.username);
				await this.authenticationService.passwordChecker(check.data.password, user.data?.password!);
				findUser = user.data!;
			}
			if (inputType === "USERNAME") {
				const user = await this.authenticationService.findUserByUsername(check.data.username);
				await this.authenticationService.passwordChecker(check.data.password, user.data?.password!);
				findUser = user.data!;
			} else {
				return this.apiResponse.badResponse("Invalid input type");
			}

			const accessToken = await this.saveCookieToBrowser(findUser);

			// Log the user in to establish session
			this.request.login(findUser, err => {
				if (err) {
					return this.apiResponse.sendResponse({
						status: status.HTTP_500_INTERNAL_SERVER_ERROR,
						message: "Login failed"
					});
				}

				return this.apiResponse.successResponse("Login successful", {
					user: findUser,
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
				return this.apiResponse.successResponse("Logged out");
			});
		} catch (error) {
			return this.apiResponse.sendResponse(error as ServiceApiResponse<unknown>);
		}
	}
}
