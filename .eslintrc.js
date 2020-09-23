/* eslint-env node */

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    browser: true,
  },
  rules: {
    'no-console': 'off',
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'prefer-const': 'off',

        // the TypeScript compiler already takes care of this and
        // leaving it enabled results in false positives for interface imports
        'no-dupe-class-members': 'off',
        'no-unused-vars': 'off',
        'no-undef': 'off',
      },
    },
  ],
};
