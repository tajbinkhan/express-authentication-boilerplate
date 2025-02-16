import pluginJs from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{ languageOptions: { globals: globals.browser } },
	{
		ignores: [
			"node_modules",
			"dist",
			"build",
			"package-lock.json",
			"pnpm-lock.yaml",
			"package.json"
		]
	},
	pluginJs.configs.recommended,
	prettierConfig,
	...tseslint.configs.recommended,
	{
		rules: {
			"no-empty": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-non-null-asserted-optional-chain": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"@typescript-eslint/no-unused-expressions": "off",
			"@typescript-eslint/no-namespace": "off",
			"no-unsafe-optional-chaining": "off"
		}
	}
];
