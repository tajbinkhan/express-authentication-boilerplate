// get express version - using import instead of require
import { version as expressVersion } from "express/package.json";
import pc from "picocolors";

import app from "@/app";
import "@/core/env";

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.listen(PORT, () => {
	console.log(pc.magenta(`\n▲ Express.js ${expressVersion}`));
	console.log(`- Local:        http://localhost:${PORT}`);
	console.log(`- Environment:  ${ENV}`);
	console.log(); // empty line
});
