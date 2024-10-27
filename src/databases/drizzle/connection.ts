import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "@/databases/drizzle/schema";

dotenv.config();

const sql = postgres(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

export default db;
