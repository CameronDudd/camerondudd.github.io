module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: true,
  trailingComma: "es5",
  bracketSameLine: true,
  printWidth: 160,
  singleAttributePerLine: true,
  plugins: ["prettier-plugin-svelte"],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
        svelteSortOrder: "options-scripts-markup-styles",
        svelteStrictMode: true,
        svelteBracketNewLine: true,
        svelteAllowShorthand: true,
      },
    },
  ],
};
