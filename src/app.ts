import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import passport from "passport";

// Passport Strategies
import { sessionTimeout } from "@/core/constants";
import { corsOptions } from "@/cors";
import appLogger from "@/logger";
import "@/passport/passportCustom";
import "@/passport/passportGoogle";
import appRateLimiter from "@/rateLimiter";
import indexRouter from "@/routes/index.route";
import appRouter from "@/routes/routes.config";
import DrizzleSessionStore from "@/session/customSessionStore";
import AppHelpers from "@/utils/appHelpers";
import { doubleCsrfProtection } from "@/utils/csrf";
import { notFoundHandler, serverErrorHandler } from "@/utils/errorHandler";

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
app.set("trust proxy", 1);
app.use(
	session({
		name: "session-id",
		secret: process.env.SECRET,
		saveUninitialized: false,
		resave: false,
		store: new DrizzleSessionStore(),
		cookie: {
			sameSite: AppHelpers.sameSiteCookieConfig().sameSite,
			secure: AppHelpers.sameSiteCookieConfig().secure,
			maxAge: sessionTimeout,
			...(AppHelpers.sameSiteCookieConfig().domain && {
				domain: AppHelpers.sameSiteCookieConfig().domain
			})
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
 * Not found handler
 * This will handle all routes that are not found
 * This is to prevent the server from crashing
 */
notFoundHandler(app);

/**
 * Error handler
 * This will handle all errors in the server
 * This is to prevent the server from crashing
 */
serverErrorHandler(app);

export default app;
