import { Express, NextFunction, Request, Response } from "express";
import multer from "multer";

import { invalidCsrfTokenError } from "@/utils/csrf";
import { ApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export function serverErrorHandler(app: Express) {
	// Add handler for unhandled promise rejections
	process.on("unhandledRejection", (reason, promise) => {
		console.error("Unhandled Promise Rejection:", reason);
	});

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		const apiResponse = new ApiResponse(res);
		console.error(err.stack);

		try {
			// Handle undefined value errors
			if (err?.message?.includes("UNDEFINED_VALUE")) {
				apiResponse.badResponse("Required value is undefined");
				return;
			}

			// Handle multer errors
			if (err instanceof multer.MulterError) {
				if (err.code === "LIMIT_FILE_SIZE") {
					apiResponse.badResponse("File size too large (max: 5MB)");
					return;
				}
				if (err.code === "LIMIT_FILE_COUNT") {
					apiResponse.badResponse("Maximum 5 files allowed per upload");
					return;
				}
				apiResponse.badResponse(err.message);
				return;
			}

			// Handle CSRF errors
			if (invalidCsrfTokenError) {
				apiResponse.forbiddenResponse(invalidCsrfTokenError.message);
				return;
			}

			// Handle any other type of error
			if (err instanceof Error) {
				apiResponse.badResponse(err.message);
				return;
			}

			apiResponse.internalServerError();
			return;
		} catch (error) {
			apiResponse.internalServerError();
			return;
		}
	});
}

// NotFoundHandler remains the same
export function notFoundHandler(app: Express) {
	app.use((req: Request, res: Response) => {
		res
			.status(status.HTTP_404_NOT_FOUND)
			.send(
				`${req.method} method is not allowed or the route does not exist. Please check your URL and method and try again.`
			);
	});
}
