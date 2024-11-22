import { NextFunction, Request, Response } from "express";

import AppHelpers from "@/utils/AppHelpers";

export const sessionExtensionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session) {
		const currentTime = Date.now();

		// Extend session expiration
		req.session.cookie.expires = new Date(currentTime + AppHelpers.sessionTimeout);

		req.session.save(err => {
			if (err) {
				console.error("Session extension error:", err);
			}
			next();
		});
	} else {
		next();
	}
};
