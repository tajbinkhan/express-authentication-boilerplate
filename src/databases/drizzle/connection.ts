import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "@/databases/drizzle/schema";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const dbPool = drizzle(pool);

export default db;
