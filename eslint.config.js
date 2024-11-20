import globals from "globals";
import pluginJs from "@eslint/js";


/** @type {import('eslint').Linter.Config[]} */
export default [
  "env"= {
    "node": true,
    "commonjs": true
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
];