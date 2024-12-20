import { Express, NextFunction, Request, Response } from "express";

import { invalidCsrfTokenError } from "@/utils/csrf";
import { ApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default function errorHandler(app: Express) {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		console.error(err.stack);
		if (invalidCsrfTokenError) {
			new ApiResponse(res).sendResponse({
				status: status.HTTP_403_FORBIDDEN,
				message: invalidCsrfTokenError.message
			});
			return;
		}
		new ApiResponse(res).sendResponse({
			status: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: err.message
		});
		return;
	});
}
