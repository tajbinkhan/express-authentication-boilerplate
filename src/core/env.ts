import { z } from "zod";

import { validateString } from "@/validators/commonRules";

export const envSchema = z.object({
	DATABASE_URL: validateString("DATABASE_URL"),
	PORT: validateString("PORT").refine(value => !isNaN(Number(value)), "PORT must be a number"),
	SECRET: validateString("SECRET"),
	NODE_ENV: validateString("NODE_ENV").refine(
		value => ["development", "production"].includes(value),
		"NODE_ENV must be either 'development' or 'production'"
	),
	SESSION_COOKIE_NAME: validateString("SESSION_COOKIE_NAME"),
	GOOGlE_CLIENT_ID: validateString("GOOGlE_CLIENT_ID"),
	GOOGLE_CLIENT_SECRET: validateString("GOOGLE_CLIENT_SECRET"),
	GOOGLE_CALLBACK_URL: validateString("GOOGLE_CALLBACK_URL"),
	APP_URL: validateString("APP_URL")
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	const errorMessages = Env.error.errors.map(e => e.message).join("\n");
	console.error(`Environment validation failed:\n${errorMessages}`);
	process.exit(1);
}

export type EnvType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
