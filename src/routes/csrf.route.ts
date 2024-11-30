import express, { Router } from "express";

import { generateToken } from "@/utils/csrf";
import { ApiResponse } from "@/utils/serviceApi";

export const csrfRouter: Router = (() => {
	const router = express.Router();

	router.get("/", (req, res) => {
		new ApiResponse(res).successResponse("CSRF token generated", generateToken(req, res));
	});

	return router;
})();
