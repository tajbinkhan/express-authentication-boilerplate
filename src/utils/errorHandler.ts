import { Express, NextFunction, Request, Response } from "express";

import { ApiResponse } from "@/utils/serviceApi";
import { status } from "@/utils/statusCodes";

export default function errorHandler(app: Express) {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		console.error(err.stack);
		new ApiResponse(res).sendResponse({
			status: status.HTTP_500_INTERNAL_SERVER_ERROR,
			message: err.message
		});
	});
}
