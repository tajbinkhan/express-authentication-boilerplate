import express, { Router } from "express";
import passport from "passport";

export const authenticationRouter: Router = (() => {
	const router = express.Router();

	router.get("/test", (req, res) => {
		req.session.save();
		res.status(200).send("Test successful");
	});

	router.post("/login", passport.authenticate("local"), (req, res) => {
		console.log(req.user);
		res.status(200).send("Logged in");
	});

	return router;
})();
