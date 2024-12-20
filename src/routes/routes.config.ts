import { Express } from "express";
import fs from "fs";

import { routes } from "@/routes/app.routes";

export default function appRouter(app: Express, initialRoute: string = "/api") {
	const allRoutes: { method: string; path: string }[] = [];

	// Iterate over all the routes in the `routes` configuration
	for (const { path, router } of routes) {
		const basePath = `${initialRoute}${path}`;
		app.use(basePath, router);

		// Access the stack to get the registered routes in the router
		router.stack.forEach((middleware: any) => {
			if (middleware.route) {
				const methods = Object.keys(middleware.route.methods);
				methods.forEach(method => {
					allRoutes.push({
						method: method.toUpperCase(),
						path: `${basePath}${middleware.route.path}`
					});
				});
			}
		});
	}

	if (process.env.NODE_ENV === "development") {
		fs.writeFileSync("routes.json", JSON.stringify(allRoutes, null, 2));
	}
}
