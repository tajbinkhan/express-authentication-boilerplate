import { Express } from "express";

import { queryTracker } from "@/databases/drizzle/connection";

export default function analysis(app: Express) {
	app.use((req, res, next) => {
		if (process.env.ANALYSIS === true) {
			queryTracker.clear(); // Reset for each request

			res.on("finish", () => {
				const duplicateQueries = Array.from(queryTracker.queries.values()).filter(
					detail => detail.count > 1
				);

				if (duplicateQueries.length > 0) {
					console.log(`\n=== Query Analysis for ${req.method} ${req.url} ===`);

					duplicateQueries.forEach(({ query, count, params }) => {
						console.log("\nDuplicate Query Detected ⚠️");
						console.log(`Times Executed: ${count}`);
						console.log(`Query: ${query}`);
						if (params) {
							console.log(`Parameters: ${JSON.stringify(params)}`);
						}
					});
					console.log("=======================================\n");
				}
			});
		}

		next();
	});
}
