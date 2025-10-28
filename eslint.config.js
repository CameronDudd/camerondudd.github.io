import { defineConfig } from "eslint/config";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import svelteParser from "svelte-eslint-parser";
import sveltePlugin from "eslint-plugin-svelte";

export default defineConfig([
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
    plugins: { "@typescript-eslint": ts },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parser: svelteParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: [".svelte"],
      },
    },
    plugins: { svelte: sveltePlugin },
    rules: {
      "svelte/no-at-html-tags": "error",
    },
  },
]);
