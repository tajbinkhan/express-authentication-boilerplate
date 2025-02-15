"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/databases/drizzle/clean.ts
var import_child_process = require("child_process");
var import_config = require("dotenv/config");
var import_pg = __toESM(require("pg"), 1);
var DatabaseCleaner = class {
  pgPool;
  constructor() {
    const pgPoolConfig = { connectionString: process.env.DATABASE_URL };
    this.pgPool = new import_pg.default.Pool(pgPoolConfig);
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
  async clearPostgresDatabase() {
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
  handleConnectionError(error) {
    if (error instanceof Error && "code" in error && error.code === "ECONNREFUSED") {
      console.log(`Connection refused on port ${process.env.PORT}. Ensure PostgreSQL is running.`);
      return;
    }
    console.error("Error clearing databases or running commands:", error);
    process.exit(1);
  }
  async runDbCommands() {
    try {
      await this.pgPool.connect();
      await this.clearPostgresDatabase();
      const commands = ["db:generate", "db:migrate"];
      commands.forEach((cmd) => (0, import_child_process.execSync)(`npm run ${cmd}`, { stdio: "inherit" }));
      console.log("Database reset completed successfully");
      process.exit(0);
    } catch (error) {
      this.handleConnectionError(error);
    }
  }
};
var databaseCleaner = new DatabaseCleaner();
databaseCleaner.runDbCommands().catch((error) => {
  console.error("Unhandled error:", error);
  process.exit(1);
});
//# sourceMappingURL=clean.cjs.map