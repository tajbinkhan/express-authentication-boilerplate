import { version as expressVersion } from "express/package.json";
import { createServer } from "http";
import ip from "ip";
import pc from "picocolors";

import app from "@/app";
import "@/core/env";
import initializeSocket from "@/socket/config";

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || "development";

const server = createServer(app);
const io = initializeSocket(server);

// Store socket.io instance on app for use in routes
app.set("io", io);

server.listen(PORT, () => {
	const ipAddress = ip.address();
	console.log(pc.magenta(`\n▲ Express.js ${expressVersion}`));
	console.log(`- Local:        http://localhost:${PORT}`);
	console.log(`- WebSocket:    http://localhost:${PORT}`);
	console.log(`- Network:      http://${ipAddress}:${PORT}`);
	console.log(`- Environment:  ${ENV}`);
	console.log();
});
