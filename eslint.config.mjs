import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginJs.configs.recommended,
	{ 
		languageOptions: { 
			globals: globals.browser,
			ecmaVersion: 12,
		},
		rules: {
		      "no-console": "warn",
		      "no-unused-vars": "warn",
		      "no-undef": "warn",
		}
	},
]; 