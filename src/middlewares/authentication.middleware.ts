import { NextFunction, Request, Response } from "express";

import { ApiResponse } from "@/utils/ServiceApi";
import { status } from "@/utils/StatusCodes";

export const authenticationMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.isAuthenticated()) {
		next();
		return;
	}

	// Handle unauthorized access
	new ApiResponse(res).sendResponse({
		status: status.HTTP_401_UNAUTHORIZED,
		message: "Unauthorized Access"
	});
};
