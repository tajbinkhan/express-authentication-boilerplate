import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as todoModel from "@/models/todo.model";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql, {
	schema: {
		...todoModel
	}
});

export default db;
