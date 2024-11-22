import { z } from "zod";

import { validateString } from "@/validators/CommonRules";

export const envSchema = z.object({
	DATABASE_URL: validateString("DATABASE_URL"),
	PORT: validateString("PORT").refine(value => !isNaN(Number(value)), "PORT must be a number"),
	SECRET: validateString("SECRET"),
	NODE_ENV: validateString("NODE_ENV").refine(
		value => ["development", "production"].includes(value),
		"NODE_ENV must be either 'development' or 'production'"
	)
});

const Env = envSchema.safeParse(process.env);

if (!Env.success) {
	const errorMessages = Env.error.errors.map(e => e.message).join("\n");
	console.error(`Environment validation failed:\n${errorMessages}`);
	process.exit(1);
} else {
	console.log("/*** Env loaded successfully ***/");
}

export type EnvType = z.infer<typeof envSchema>;

declare global {
	namespace NodeJS {
		interface ProcessEnv extends EnvType {}
	}
}
