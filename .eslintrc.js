module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
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
		"@typescript-eslint/consistent-type-exports": "error",
		"@typescript-eslint/consistent-type-imports": "error",
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
	},
};
