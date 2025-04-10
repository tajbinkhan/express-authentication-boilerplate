import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src", "drizzle.config.ts"],
	splitting: false,
	sourcemap: false,
	clean: true,
	define: { "process.env.NODE_ENV": "'production'" },
	format: ["esm"],
	outExtension: () => ({
		js: `.js`
	})
});
