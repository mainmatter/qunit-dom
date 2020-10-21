import typescript from 'rollup-plugin-typescript2';

const typescriptConfiguration = {
  exclude: [
    'node_modules/**',
    'lib/**/__tests__/**',
    'lib/**/*.test.ts',
    'lib/helpers/test-assertions.ts',
  ],
};

const iifeBundle = {
  input: 'lib/qunit-dom-globals.ts',

  external: ['qunit'],
  plugins: [typescript(typescriptConfiguration)],

  output: {
    file: 'dist/qunit-dom.js',
    format: 'iife',
    sourcemap: true,
  },
};

const esBundle = {
  input: 'lib/qunit-dom-modules.ts',

  external: ['qunit'],
  plugins: [typescript(typescriptConfiguration)],

  output: {
    file: 'dist/addon-test-support/index.js',
    format: 'es',
    sourcemap: true,
  },
};

export default [iifeBundle, esBundle];
