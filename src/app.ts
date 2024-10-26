import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import pc from "picocolors";

import appRouter from "@/api";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());

// Log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
	const { method, url } = req;
	const start = Date.now();

	console.log(`${pc.green("✓")} ${method} ${url}`);

	res.on("finish", () => {
		const duration = Date.now() - start;
		const statusCode = res.statusCode;

		// Color the status code based on its type
		let coloredStatusCode;
		if (statusCode >= 500) coloredStatusCode = pc.red(statusCode.toString());
		else if (statusCode >= 400) coloredStatusCode = pc.yellow(statusCode.toString());
		else if (statusCode >= 300) coloredStatusCode = pc.cyan(statusCode.toString());
		else if (statusCode >= 200) coloredStatusCode = pc.green(statusCode.toString());
		else coloredStatusCode = pc.red("500");

		console.log(`${pc.green("✓")} ${method} ${url} ${coloredStatusCode} in ${duration}ms`);
	});

	next();
});

// Rate limit all requests
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	message: "Too many requests, please try again later."
});

// Apply to all requests to the server
app.use(limiter);

// All routes are handled in the api.ts file
appRouter(app);

export default app;
