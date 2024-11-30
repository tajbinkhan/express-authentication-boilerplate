import unusedImports from "eslint-plugin-unused-imports";

export default [
	{
		plugins: {
			"unused-imports": unusedImports
		},

		rules: {
			"no-console": 0,
			indent: 0,
			"linebreak-style": 0,
			"unused-imports/no-unused-imports": "warn",

			"unused-imports/no-unused-vars": [
				"off",
				{
					vars: "all",
					varsIgnorePattern: "^_",
					args: "after-used",
					argsIgnorePattern: "^_"
				}
			]
		}
	}
];
