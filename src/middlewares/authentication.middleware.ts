import { NextFunction, Request, Response } from "express";

import { decode } from "@/app/authentication/authentication.JWT";

import { ApiResponse } from "@/utils/serviceApi";

const jwtTokenName = process.env.SESSION_COOKIE_NAME;

export const authenticationMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const apiResponse = new ApiResponse(res);
	try {
		const token = req.cookies[jwtTokenName];

		if (!token) {
			apiResponse.unauthorizedResponse("Unauthorized: No token provided");
		}

		const decodeToken = await decode({ token });

		if (!decodeToken) {
			apiResponse.unauthorizedResponse("Unauthorized: Invalid token");
		}

		if (!req.isAuthenticated()) {
			apiResponse.unauthorizedResponse("Unauthorized: Not authenticated");
		}

		next();
	} catch (error) {
		console.error("Authentication middleware error:", error);
		apiResponse.internalServerError();
	}
};
