import { doubleCsrf } from "csrf-csrf";

import { csrfTimeout } from "@/core/constants";

const {
	generateToken, // Use this in your routes to generate tokens
	validateRequest, // Use this as middleware to validate tokens
	doubleCsrfProtection, // This is the express middleware
	invalidCsrfTokenError // This is the error thrown when the token is invalid
} = doubleCsrf({
	getSecret: () => process.env.SECRET, // Secret for generating tokens
	cookieName: "csrf-token", // Cookie name for the token
	cookieOptions: {
		maxAge: csrfTimeout,
		secure: process.env.NODE_ENV === "production"
	},
	size: 32, // The size of the generated tokens
	errorConfig: {
		message: "Invalid CSRF token"
	},
	getTokenFromRequest: req => req.headers["x-csrf-token"] // Get the token from the request
});

export { doubleCsrfProtection, generateToken, invalidCsrfTokenError, validateRequest };
