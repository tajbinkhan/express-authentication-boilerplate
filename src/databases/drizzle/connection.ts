import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import schema from "@/databases/drizzle/schema";

interface QueryDetails {
	query: string;
	count: number;
	params?: any[];
	timestamp: Date;
}

dotenv.config();

export const queryTracker = {
	queries: new Map<string, QueryDetails>(),
	clear() {
		this.queries.clear();
	},
	add(query: string, params?: any) {
		const queryKey = `${query}`;
		const existing = this.queries.get(queryKey);

		this.queries.set(queryKey, {
			query,
			params,
			count: existing ? existing.count + 1 : 1,
			timestamp: new Date()
		});
	}
};

const sql = postgres(process.env.DATABASE_URL, {
	debug: (query, params) => {
		queryTracker.add(String(query), params);
	}
});

const db = drizzle(sql, { schema });

const pool = postgres(process.env.DATABASE_URL, { max: 1 });
export const dbPool = drizzle(pool);

export default db;
