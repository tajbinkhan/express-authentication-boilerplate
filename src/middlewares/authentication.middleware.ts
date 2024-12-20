import { NextFunction, Request, Response } from "express";

import { decode } from "@/app/authentication/authentication.JWT";

import { ApiResponse } from "@/utils/serviceApi";

const jwtTokenName = process.env.JWT_COOKIE_NAME;
const sessionCookieName = process.env.SESSION_COOKIE_NAME;

export const authenticationMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const apiResponse = new ApiResponse(res);
	try {
		const token = req.cookies[jwtTokenName];

		if (!token) {
			res.clearCookie(jwtTokenName);
			res.clearCookie(sessionCookieName);
			apiResponse.unauthorizedResponse("Unauthorized: No token provided");
			return;
		}

		const decodeToken = await decode({ token });

		if (!decodeToken) {
			res.clearCookie(jwtTokenName);
			res.clearCookie(sessionCookieName);
			apiResponse.unauthorizedResponse("Unauthorized: Invalid token");
			return;
		}

		if (!req.isAuthenticated()) {
			res.clearCookie(jwtTokenName);
			res.clearCookie(sessionCookieName);
			apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");
			return;
		}

		next();
	} catch (error) {
		res.clearCookie(jwtTokenName);
		res.clearCookie(sessionCookieName);
		console.error("Authentication middleware error:", error);
		apiResponse.unauthorizedResponse("Unauthorized");
		return;
	}
};
