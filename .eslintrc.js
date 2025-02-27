module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    '@serverless/eslint-config/node',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        printWidth: 80,
        endOfLine: 'crlf',
      },
    ],
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'error',
    'no-console': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-inferrable-types': 'error',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
