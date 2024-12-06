import express, { Router } from "express";
import passport from "passport";

import AuthenticationController from "@/app/authentication/authentication.controller";

import { authenticationMiddleware } from "@/middlewares/authentication.middleware";

export const authenticationRouter: Router = (() => {
	const router = express.Router();

	router.post("/register", (req, res) => {
		new AuthenticationController(req, res).register();
	});

	router.get("/test", authenticationMiddleware, (req, res) => {
		res.status(200).send("Test successful");
	});

	// Local Authentication
	router.post("/login", async (req, res) => {
		new AuthenticationController(req, res).loginWithUsername();
	});

	// Google Authentication
	router.get("/login/google", passport.authenticate("google", { scope: ["profile", "email"] }));
	router.get(
		"/google/callback",
		passport.authenticate("google", { failureRedirect: "/login" }),
		(req, res) => {
			new AuthenticationController(req, res).loginWithGoogle();
		}
	);

	// Logout route
	router.post("/logout", (req, res) => {
		new AuthenticationController(req, res).logout();
	});

	// Session route
	router.get("/session", authenticationMiddleware, (req, res) => {
		new AuthenticationController(req, res).getSession();
	});

	// UI Routes
	router.get("/google", (req, res) => {
		res.status(200).send(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Google Login</title>
				<style>
					body {
						display: flex;
						justify-content: center;
						align-items: center;
						height: 100vh;
						margin: 0;
						font-family: Arial, sans-serif;
						background-color: #f1f1f1;
					}

					.google-login-btn {
						max-width: 200px;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: #4285F4;
						color: white;
						font-family: Arial, sans-serif;
						font-size: 16px;
						font-weight: bold;
						padding: 10px 20px;
						border-radius: 4px;
						text-decoration: none;
						border: none;
						box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
						cursor: pointer;
						transition: background-color 0.3s ease, box-shadow 0.3s ease;
					}

					.google-login-btn:hover {
						background-color: #357AE8;
						box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
					}
				</style>
			</head>
			<body>
				<a href="http://localhost:3000/api/auth/login/google" class="google-login-btn">
					Sign in with Google
				</a>
			</body>
			</html>
			`);
	});

	return router;
})();
