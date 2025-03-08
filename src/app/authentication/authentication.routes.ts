import express, { Router } from "express";
import passport from "passport";

import AuthenticationController from "@/app/authentication/authentication.controller";

import { authenticationMiddleware } from "@/middlewares/authentication.middleware";

export const authenticationRouter: Router = (() => {
	const router = express.Router();

	// Get current user route
	router.get("/me", (req, res) => {
		new AuthenticationController(req, res).getSession();
	});

	// Session route
	router.get("/session", authenticationMiddleware, (req, res) => {
		new AuthenticationController(req, res).verifySession();
	});

	// Account verification route
	router.get("/account-verification", authenticationMiddleware, (req, res) => {
		new AuthenticationController(req, res).checkAccountVerification();
	});

	// Register route
	router.post("/register", (req, res) => {
		new AuthenticationController(req, res).register();
	});

	// Request OTP route
	router.post("/request-otp", (req, res) => {
		new AuthenticationController(req, res).requestOTPForUnverifiedUser();
	});

	// Local Authentication
	router.post("/login", async (req, res) => {
		new AuthenticationController(req, res).loginWithUsername();
	});

	// Local Authentication with OTP
	router.post("/login/otp", async (req, res) => {
		new AuthenticationController(req, res).loginWithUsernameAndOTP();
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

	// Verify user route
	router.post("/verify-user", (req, res) => {
		new AuthenticationController(req, res).verifyUser();
	});

	// Check user route
	router.post("/check-user", (req, res) => {
		new AuthenticationController(req, res).checkUser();
	});

	// Password reset route
	router.post("/reset-password", (req, res) => {
		new AuthenticationController(req, res).resetPassword();
	});

	// Password reset confirmation route
	router.post("/reset-password/confirm", (req, res) => {
		new AuthenticationController(req, res).resetPasswordConfirm();
	});

	// Password change route
	router.post("/change-password", authenticationMiddleware, (req, res) => {
		new AuthenticationController(req, res).changePassword();
	});

	// Logout route
	router.post("/logout", authenticationMiddleware, (req, res) => {
		new AuthenticationController(req, res).logout();
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
				<a href="http://localhost:8080/api/auth/login/google" class="google-login-btn">
					Sign in with Google
				</a>
			</body>
			</html>
			`);
	});

	return router;
})();
