import express, { Router } from "express";

import { authenticationMiddleware } from "@/middlewares/authentication.middleware";
import { localAuthentication } from "@/passport/PassportLocal";

export const authenticationRouter: Router = (() => {
	const router = express.Router();

	router.get("/test", authenticationMiddleware, (req, res) => {
		res.status(200).send("Test successful");
	});

	router.post("/login", localAuthentication, (req, res) => {
		console.log(req.user);
		res.status(200).send("Logged in");
	});

	router.post("/logout", (req, res) => {
		req.session.destroy(err => {
			if (err) {
				console.log(err);
				res.status(500).send("Error logging out");
			}
			res.status(200).send("Logged out");
		});
	});

	return router;
})();
