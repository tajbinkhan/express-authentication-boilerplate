import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["./src", "drizzle.config.ts"],
	splitting: false,
	sourcemap: true,
	clean: true
});
