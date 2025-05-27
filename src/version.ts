import { readFileSync } from "fs";
import { join } from "path";

// Read Express version from package.json
const getExpressVersion = () => {
	try {
		// Method 1: Read from project's package.json - most reliable
		const projectPkgPath = join(process.cwd(), "package.json");
		const projectPkg = JSON.parse(readFileSync(projectPkgPath, "utf-8"));
		const expressVersion = projectPkg.dependencies?.express || projectPkg.devDependencies?.express;

		if (expressVersion) {
			// Clean version string by removing semver operators
			return expressVersion.replace(/[\^~<>=\s]/g, "");
		}

		// Method 2: Fallback to reading from express package directly
		const expressPath = join(process.cwd(), "node_modules/express/package.json");
		const pkg = JSON.parse(readFileSync(expressPath, "utf-8"));
		return pkg.version;
	} catch {
		return "unknown";
	}
};

export default getExpressVersion;
