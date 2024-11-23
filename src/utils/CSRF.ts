import { doubleCsrf } from "csrf-csrf";

const {
	generateToken, // Use this in your routes to generate tokens
	validateRequest, // Use this as middleware to validate tokens
	doubleCsrfProtection, // This is the express middleware
	invalidCsrfTokenError // This is the error thrown when the token is invalid
} = doubleCsrf({
	getSecret: () => process.env.SECRET, // Secret for generating tokens
	cookieName: "x-csrf-token", // Cookie name for the token
	cookieOptions: {
		maxAge: 60 * 60 * 1000 // 1 hour
	},
	size: 32, // The size of the generated tokens
	getTokenFromRequest: req => req.headers["x-csrf-token"] // Get the token from the request
});

export { doubleCsrfProtection, generateToken, invalidCsrfTokenError, validateRequest };
