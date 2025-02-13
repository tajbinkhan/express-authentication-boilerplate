import { execSync } from "child_process";
import "dotenv/config";
import pg from "pg";

class DatabaseCleaner {
	private pgPool: pg.Pool;

	constructor() {
		const pgPoolConfig = { connectionString: process.env.DATABASE_URL };
		this.pgPool = new pg.Pool(pgPoolConfig);
	}

	// TODO: Implement this method if you have MongoDB in your project
	// private async clearMongoDatabase(): Promise<void> {
	// 	try {
	// 		await mongoose.connect(process.env.MONGO_DATABASE_URL || "");
	// 		const db = mongoose.connection.db;

	// 		if (!db) {
	// 			throw new Error("MongoDB connection is not established");
	// 		}

	// 		const collections = await db.collections();
	// 		for (const collection of collections) {
	// 			if (!["admin", "system.profile"].includes(collection.collectionName)) {
	// 				await collection.drop();
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.error("Error clearing MongoDB:", error);
	// 	} finally {
	// 		await mongoose.connection.close(); // Ensure connection closes
	// 	}
	// }

	private async clearPostgresDatabase(): Promise<void> {
		const schemas = ["public", "drizzle"];

		for (const schema of schemas) {
			try {
				await this.pgPool.query(`DROP SCHEMA IF EXISTS ${schema} CASCADE;`);
				await this.pgPool.query(`CREATE SCHEMA ${schema};`);
			} catch (error) {
				console.error(`Error handling ${schema} schema:`, error);
			}
		}
	}

	private handleConnectionError(error: unknown): void {
		if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
			console.log(`Connection refused on port ${process.env.PORT}. Ensure PostgreSQL is running.`);
			return;
		}
		console.error("Error clearing databases or running commands:", error);
		process.exit(1);
	}

	async runDbCommands(): Promise<void> {
		try {
			await this.pgPool.connect();
			// await this.clearMongoDatabase();
			await this.clearPostgresDatabase();

			const commands = ["db:generate", "db:migrate"];
			commands.forEach(cmd => execSync(`npm run ${cmd}`, { stdio: "inherit" }));

			console.log("Database reset completed successfully");
			process.exit(0);
		} catch (error) {
			this.handleConnectionError(error);
		}
	}
}

const databaseCleaner = new DatabaseCleaner();
databaseCleaner.runDbCommands().catch(error => {
	console.error("Unhandled error:", error);
	process.exit(1);
});
