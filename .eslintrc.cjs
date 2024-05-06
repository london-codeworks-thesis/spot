module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
  ],
  plugins: ['@typescript-eslint', 'unused-imports'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.js', '.jsx', '.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    "@typescript-eslint/space-before-function-paren": "off",
    "global-require":"off",
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-console': 'off',
    eqeqeq: 'warn',
    'func-style': ['error', 'declaration'],
    'object-shorthand': 'off',
    'keyword-spacing': 'error',
    'linebreak-style': ['error', 'unix'],
    'no-plusplus': 'off',
    'spaced-comment': 'error',
    quotes: ['error', 'single'],
    semi: 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'always'],
    indent: ['error', 2],
    'react/jsx-no-target-blank': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};