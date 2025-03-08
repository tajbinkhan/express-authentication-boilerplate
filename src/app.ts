import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import path from "path";

import { corsOptions } from "@/cors";
import analysis from "@/databases/drizzle/analysis";
import appLogger from "@/logger";
import { uploadDir } from "@/multer/globalConfig";
import "@/passport/passportCustom";
import "@/passport/passportGoogle";
import appRateLimiter from "@/rateLimiter";
import indexRouter from "@/routes/index.route";
import appRouter from "@/routes/routes.config";
import sessionConfig from "@/session";
import { doubleCsrfProtection } from "@/utils/csrf";
import domainStore from "@/utils/domainStore";
import { notFoundHandler, serverErrorHandler } from "@/utils/errorHandler";

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(`/${uploadDir}`, express.static(path.join(process.cwd(), "uploads")));

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
 * Store client and server domain
 * This is used to store the client and server domain
 * This is used for authentication
 */
app.use(domainStore);

/**
 * Initialize session
 * This is used to store session data
 * This is used for authentication
 */
app.set("trust proxy", 1);
app.use(sessionConfig);

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
 * Initialize query analysis
 * This will analyze all queries made to the database
 * This is to monitor the database
 */
analysis(app);

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

// Store socket.io instance on app for use in routes

/**
 * Error handler
 * This will handle all errors in the server
 * This is to prevent the server from crashing
 */
serverErrorHandler(app);

export default app;
