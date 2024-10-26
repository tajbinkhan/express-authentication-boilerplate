import { Express } from "express";

import { routes } from "@/config/route.config";

export default function appRouter(app: Express, initialRoute: string = "/api") {
	for (const { path, router } of routes) {
		app.use(`${initialRoute}${path}`, router);
	}
}
