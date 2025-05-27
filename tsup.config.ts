import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src", "drizzle.config.ts"],
	format: ["esm"],
	target: "es2022",
	splitting: false,
	sourcemap: false,
	clean: true,
	define: { "process.env.NODE_ENV": "'production'" },
	external: ["sharp"]
});
