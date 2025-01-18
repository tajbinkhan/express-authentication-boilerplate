import { z } from "zod";

import { validateEnum, validateString } from "@/validators/commonRules";

export const googleEnvSchema = z.object({
	GOOGLE_CLIENT_ID: validateString("GOOGLE_CLIENT_ID"),
	GOOGLE_CLIENT_SECRET: validateString("GOOGLE_CLIENT_SECRET"),
	GOOGLE_CALLBACK_URL: validateString("GOOGLE_CALLBACK_URL")
});

const emailEnvSchema = z.object({
	EMAIL_SERVER_HOST: validateString("EMAIL_SERVER_HOST"),
	EMAIL_SERVER_PORT: validateString("EMAIL_SERVER_PORT"),
	EMAIL_SERVER_USER: validateString("EMAIL_SERVER_USER"),
	EMAIL_SERVER_PASSWORD: validateString("EMAIL_SERVER_PASSWORD"),
	EMAIL_FROM: validateString("EMAIL_FROM")
});

export const envSchema = z.object({
	DATABASE_URL: validateString("DATABASE_URL"),
	MONGO_DATABASE_URL: validateString("MONGO_DATABASE_URL"),
	PORT: validateString("PORT").refine(value => !isNaN(Number(value)), "PORT must be a number"),
	SECRET: validateString("SECRET"),
	NODE_ENV: validateEnum("NODE_ENV", ["development", "production"]),
	JWT_COOKIE_NAME: validateString("JWT_COOKIE_NAME"),
	SESSION_COOKIE_NAME: validateString("SESSION_COOKIE_NAME"),
	ORIGIN_URL: validateString("ORIGIN_URL"),
	APP_URL: validateString("APP_URL"),
	API_URL: validateString("API_URL"),
	...googleEnvSchema.shape,
	...emailEnvSchema.shape
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
