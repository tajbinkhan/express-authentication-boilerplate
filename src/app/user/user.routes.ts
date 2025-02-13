import express, { Router } from "express";

import UserController from "@/app/user/user.controller";

export const userRouter: Router = (() => {
	const router = express.Router();

	router.route("/").get((req, res) => {
		new UserController(req, res).index();
	});

	return router;
})();
