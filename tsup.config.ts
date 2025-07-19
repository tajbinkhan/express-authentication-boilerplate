import { defineConfig } from "tsup";

export default defineConfig([
	// Main application bundle (optimized)
	{
		entry: ["./src/server.ts"],
		format: ["esm"],
		target: "es2022",
		splitting: true,
		sourcemap: false,
		clean: true,
		bundle: true,
		minify: true,
		treeshake: true,
		outDir: "dist",
		outExtension: () => ({ js: ".js" }),
		define: { "process.env.NODE_ENV": "'production'" },
		external: ["sharp"],
		esbuildOptions(options) {
			options.keepNames = false;
		}
	},
	// Drizzle config (separate)
	{
		entry: ["drizzle.config.ts"],
		format: ["esm"],
		target: "es2022",
		splitting: false,
		sourcemap: false,
		clean: false,
		bundle: false,
		outDir: "dist",
		outExtension: () => ({ js: ".js" }),
		external: ["sharp"]
	}
]);
