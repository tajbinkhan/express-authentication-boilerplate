import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";

import appRouter from "@/api";
import appLogger from "@/logger";
// Passport Strategies
import { sessionExtensionMiddleware } from "@/middlewares/session.middleware";
import "@/passport/PassportLocal";
import appRateLimiter from "@/rateLimiter";
import DrizzleSessionStore from "@/session/CustomSessionStore";
import AppHelpers from "@/utils/AppHelpers";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

/**
 * Initialize logger
 * This will log all requests to the server
 * This is to monitor the server
 */
appLogger(app);

/**
 * Rate limiter for all requests
 * This will limit the number of requests to the server
 * This is to prevent abuse of the server
 */
appRateLimiter(app);

// Initialize session
app.use(
	session({
		name: "session.id",
		secret: process.env.SECRET,
		saveUninitialized: true,
		resave: false,
		store: new DrizzleSessionStore(),
		cookie: {
			maxAge: AppHelpers.sessionTimeout
		}
	})
);

app.use(sessionExtensionMiddleware);

/**
 * Initialize passport
 * This is used for authentication
 */
app.use(passport.initialize());
app.use(passport.session());

/**
 * Initialize all routes are handled in the api.ts file
 * All routes will start with /api
 * Example: http://localhost:3000/api/auth/login
 */
appRouter(app);

export default app;
