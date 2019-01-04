/* eslint-env node */

module.exports = {
  root: true,
  parser: 'typescript-eslint-parser',
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['prettier', 'typescript'],
  extends: ['eslint:recommended', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    'no-console': 'off',
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // the TypeScript compiler already takes care of this and
        // leaving it enabled results in false positives for interface imports
        'no-dupe-class-members': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
