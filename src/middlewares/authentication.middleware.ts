import { NextFunction, Request, Response } from "express";

import { decode } from "@/app/authentication/authentication.JWT";

import { ApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

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
			apiResponse.sendResponse({
				status: status.HTTP_401_UNAUTHORIZED,
				message: "Unauthorized: No token"
			});
		}

		const decodeToken = await decode({ token });

		if (!decodeToken) {
			apiResponse.sendResponse({
				status: status.HTTP_401_UNAUTHORIZED,
				message: "Unauthorized: Invalid token"
			});
		}

		if (!req.isAuthenticated()) {
			apiResponse.sendResponse({
				status: status.HTTP_401_UNAUTHORIZED,
				message: "Unauthorized: Not authenticated"
			});
		}

		next();
	} catch (error) {
		console.error("Authentication middleware error:", error);
		apiResponse.sendResponse({
			status: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: "Internal server error"
		});
	}
};
