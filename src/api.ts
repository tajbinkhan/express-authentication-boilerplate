import { Express } from "express";

import { routes } from "@/routes/app.routes";

export default function appRouter(app: Express, initialRoute: string = "/api") {
	for (const { path, router } of routes) {
		app.use(`${initialRoute}${path}`, router);
	}
}
