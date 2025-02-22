import express, { Router } from "express";

import UserController from "@/app/user/user.controller";

export const userRouter: Router = (() => {
	const router = express.Router();

	router
		.route("/")
		.get((req, res) => {
			new UserController(req, res).index();
		})
		.delete((req, res) => {
			new UserController(req, res).delete();
		});

	router.get("/export", (req, res) => {
		new UserController(req, res).export();
	});

	return router;
})();
