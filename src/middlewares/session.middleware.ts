import { NextFunction, Request, Response } from "express";

import AppHelpers from "@/utils/AppHelpers";

export const sessionExtensionMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req.session) {
		// Update session expiration
		req.session.cookie.maxAge = AppHelpers.sessionTimeout;

		// Set cookie with correct options
		res.cookie("session.id", req.session.id, {
			maxAge: AppHelpers.sessionTimeout
		});

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
