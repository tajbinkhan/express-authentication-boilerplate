import { CorsOptions } from "cors";

import { origins } from "@/core/constants";

// CORS configuration with options
export const corsOptions: CorsOptions = {
	// Allow specific origin
	// origin: "https://yourdomain.com",

	// Allow multiple origins
	origin: origins,

	// Optional: Allow all origins (use with caution)
	// origin: '*',

	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],

	// Enable credentials (cookies, authorization headers)
	credentials: true,

	// Optional: Maximum age of preflight request cache
	maxAge: 3600
};
