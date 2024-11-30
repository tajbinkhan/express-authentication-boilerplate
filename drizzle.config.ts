import type { Config } from "drizzle-kit";

const connectionString = process.env.DATABASE_URL;
const schemaPath = ["./src/models/drizzle"];
const migrationPath = "./.drizzle/migrations/";

export default {
	dialect: "postgresql",
	schema: schemaPath,
	out: migrationPath,
	dbCredentials: { url: connectionString },
	verbose: true,
	strict: true
} as Config;
