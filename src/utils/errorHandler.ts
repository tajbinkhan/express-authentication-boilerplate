import { Express, NextFunction, Request, Response } from "express";
import multer from "multer";

import { invalidCsrfTokenError } from "@/utils/csrf";
import { ApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export function serverErrorHandler(app: Express) {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		const apiResponse = new ApiResponse(res);
		console.error(err.stack);
		if (err instanceof multer.MulterError) {
			if (err.code === "LIMIT_FILE_SIZE") {
				apiResponse.badResponse("File size too large (max: 5MB)");
			}
			if (err.code === "LIMIT_FILE_COUNT") {
				console.log("Multer error: 1");
				apiResponse.badResponse("Maximum 5 files allowed per upload");
			}
			apiResponse.badResponse(err.message);
			return;
		}
		if (invalidCsrfTokenError) {
			apiResponse.forbiddenResponse(invalidCsrfTokenError.message);
			return;
		}
		apiResponse.internalServerError();
		return;
	});
}

export function notFoundHandler(app: Express) {
	app.use((req: Request, res: Response) => {
		res
			.status(status.HTTP_404_NOT_FOUND)
			.send(
				`${req.method} method is not allowed or the route does not exist. Please check your URL and method and try again.`
			);
	});
}
