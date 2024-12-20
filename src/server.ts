// get express version - using import instead of require
import { version as expressVersion } from "express/package.json";
import ip from "ip";
import pc from "picocolors";

import app from "@/app";
import "@/core/env";

const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
	const ipAddress = ip.address();
	console.log(pc.magenta(`\n▲ Express.js ${expressVersion}`));
	console.log(`- Local:        http://localhost:${PORT}`);
	console.log(`- Network:      http://${ipAddress}:${PORT}`);
	console.log(`- Environment:  ${ENV}`);
	console.log();
});
