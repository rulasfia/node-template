module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["./tsconfig.json"],
		sourceType: "module",
	},
	ignorePatterns: ["dist", ".eslintrc.js"],
	rules: {
		"@typescript-eslint/no-unused-vars": "error",
		"@typescript-eslint/no-explicit-any": "error",
		"@typescript-eslint/explicit-module-boundary-types": "error",
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
	},
};
