import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";

import appRouter from "@/api";
import { corsOptions } from "@/cors";
import appLogger from "@/logger";
// Passport Strategies
import "@/passport/passportCustom";
import "@/passport/passportGoogle";
import appRateLimiter from "@/rateLimiter";
import indexRouter from "@/routes/index.route";
import DrizzleSessionStore from "@/session/customSessionStore";
import AppHelpers from "@/utils/appHelpers";
import { doubleCsrfProtection } from "@/utils/csrf";
import errorHandler from "@/utils/errorHandler";

dotenv.config();

const app = express();
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

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

/**
 * Initialize session
 * This is used to store session data
 * This is used for authentication
 */
app.use(
	session({
		name: "session-id",
		secret: process.env.SECRET,
		saveUninitialized: false,
		resave: false,
		store: new DrizzleSessionStore(),
		rolling: true,
		cookie: {
			maxAge: AppHelpers.sessionTimeout
		}
	})
);

/**
 * Initialize passport
 * This is used for authentication
 */
app.use(passport.initialize());
app.use(passport.session());

// Generate CSRF token for all routes
app.use(doubleCsrfProtection);

/**
 * Default route
 * This is the default route for the server
 */
indexRouter(app);

/**
 * Initialize all routes are handled in the api.ts file
 * All routes will start with /api
 * Example: http://localhost:3000/api/auth/login
 */
appRouter(app);

/**
 * Error handler
 * This will handle all errors in the server
 * This is to prevent the server from crashing
 */
errorHandler(app);

export default app;
