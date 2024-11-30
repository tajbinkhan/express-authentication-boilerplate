import { Express } from "express";
import rateLimit from "express-rate-limit";

export default function appRateLimiter(app: Express) {
	// Rate limit all requests
	const limiter = rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 100,
		message: "Too many requests, please try again later."
	});

	// Apply to all requests to the server
	app.use(limiter);
}
