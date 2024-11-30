import { Express, NextFunction, Request, Response } from "express";
import pc from "picocolors";

export default function appLogger(app: Express) {
	app.use((req: Request, res: Response, next: NextFunction) => {
		const { method, url } = req;
		const start = Date.now();

		console.log(`${pc.green("✓")} ${method} ${url}`);

		res.on("finish", () => {
			const duration = Date.now() - start;
			const statusCode = res.statusCode;

			// Color the status code based on its type
			let coloredStatusCode;
			if (statusCode >= 500) coloredStatusCode = pc.red(statusCode.toString());
			else if (statusCode >= 400) coloredStatusCode = pc.yellow(statusCode.toString());
			else if (statusCode >= 300) coloredStatusCode = pc.cyan(statusCode.toString());
			else if (statusCode >= 200) coloredStatusCode = pc.green(statusCode.toString());
			else coloredStatusCode = pc.red("500");

			console.log(`${pc.green("✓")} ${method} ${url} ${coloredStatusCode} in ${duration}ms`);
		});

		next();
	});
}
