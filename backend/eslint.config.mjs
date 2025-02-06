import eslint from "@eslint/js";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptEslintParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import unicorn from "eslint-plugin-unicorn";
import unusedImports from "eslint-plugin-unused-imports";
import typescriptEslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...typescriptEslint.configs.recommended,
  unicorn.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        parser: typescriptEslintParser,
        project: ["./tsconfig.json", "./tsconfig.node.json"],
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
      prettier: prettierPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "@typescript-eslint/explicit-module-boundary-types": ["error"],
      "@typescript-eslint/switch-exhaustiveness-check": ["error"],
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-promise-reject-errors": "off",
      "no-unused-vars": "off",
      // eslint-disable-next-line no-undef
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      curly: ["warn", "all"],
      quotes: ["warn", "double", { avoidEscape: true }],
      "prettier/prettier": "warn",
      "unused-imports/no-unused-imports": "error",
      "unicorn/prevent-abbreviations": "off",
      "unicorn/no-nested-ternary": "off",
    },
  },
];
