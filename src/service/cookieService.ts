import { Request, Response } from "express";

import { encode } from "@/app/authentication/authentication.JWT";

import { sessionTimeout } from "@/core/constants";
import { UserSchemaType } from "@/databases/drizzle/types";

export default class CookieService {
	protected request: Request;
	protected response: Response;
	protected jwtCookieName: string;
	protected sessionCookieName: string;

	constructor(request: Request, response: Response) {
		this.request = request;
		this.response = response;
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
				maxAge: sessionTimeout,
				sameSite: "strict"
			});

			return Promise.resolve(accessToken);
		} catch (error) {
			return Promise.resolve(null);
		}
	}

	async clearCookieFromBrowser() {
		this.response.clearCookie(this.jwtCookieName);
		this.response.clearCookie(this.sessionCookieName);
	}
}
