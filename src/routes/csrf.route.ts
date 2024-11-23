import express, { Router } from "express";

import { generateToken } from "@/utils/CSRF";
import { ApiResponse } from "@/utils/ServiceApi";

export const csrfRouter: Router = (() => {
	const router = express.Router();

	router.get("/", (req, res) => {
		new ApiResponse(res).successResponse("CSRF token generated", {
			csrfToken: generateToken(req, res)
		});
	});

	return router;
})();
