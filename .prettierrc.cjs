/** @type {import("prettier").Config} */
const config = {
  trailingComma: 'es5',
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
