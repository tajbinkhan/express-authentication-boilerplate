import { CorsOptions } from "cors";

// CORS configuration with options
export const corsOptions: CorsOptions = {
	origin: function (
		origin: string | undefined,
		callback: (err: Error | null, allow?: boolean) => void
	) {
		if (!origin || process.env.ORIGIN_URL.split(",").includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,

	methods: ["GET", "POST", "PUT", "DELETE"],

	allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token", "ngrok-skip-browser-warning"],
	maxAge: 3600
};
