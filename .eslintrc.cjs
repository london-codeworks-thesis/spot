module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
  ],
  plugins: ['@typescript-eslint', 'unused-imports', '@stylistic'],
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
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
    '@stylistic/keyword-spacing': 'error',
    '@stylistic/linebreak-style': ['error', 'unix'],
    '@stylistic/quotes': ['error', 'single'],
    '@stylistic/semi': 'error',
    '@stylistic/space-before-blocks': 'error',
    '@stylistic/space-before-function-paren': ['error', 'always'],
    '@stylistic/spaced-comment': 'error',
    '@stylistic/ts/space-before-function-paren': 'off',
    '@stylistic/jsx-quotes': ['error', 'prefer-single'],
    "@typescript-eslint/space-before-function-paren": "off",
    '@typescript-eslint/indent': ['error', 2],
    'global-require': 'off',
    'max-len': ['off'],
    "indent": ["error", 2],
    'quotes': ['error', 'single'],
    'jsx-quotes': ['error', 'prefer-single'],
    'no-console': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'object-shorthand': 'off',
    'react/jsx-no-target-blank': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'eqeqeq': 'warn',
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
  "overrides": [
    {
      "files": ["scripts/**/*.js"],
      "rules": {
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}]
      }
    }
  ]
};
