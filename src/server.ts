import { version as expressVersion } from "express/package.json";
import ip from "ip";
import pc from "picocolors";

import app from "@/app";
import "@/core/env";

const startServer = async () => {
	const initialPort = process.env.PORT || 8080;
	const ENV = process.env.NODE_ENV || "development";

	// Function to find an available port
	const findAvailablePort = (startPort: number): Promise<number> => {
		return new Promise((resolve, reject) => {
			const server = app.listen(startPort, () => {
				server.close(() => resolve(startPort));
			});

			server.on("error", (err: NodeJS.ErrnoException) => {
				if (err.code === "EACCES" || err.code === "EADDRINUSE") {
					// Try the next port
					resolve(findAvailablePort(startPort + 1));
				} else {
					reject(err);
				}
			});
		});
	};

	try {
		const port = await findAvailablePort(Number(initialPort));
		const ipAddress = ip.address();

		app.listen(port, () => {
			console.log(pc.magenta(`\n▲ Express.js ${expressVersion}`));
			console.log(`- Local:        http://localhost:${port}`);
			console.log(`- Network:      http://${ipAddress}:${port}`);
			console.log(`- Environment:  ${ENV}`);
			console.log();
		});
	} catch (error) {
		console.error("Failed to start server:", error);
		process.exit(1);
	}
};

startServer();
