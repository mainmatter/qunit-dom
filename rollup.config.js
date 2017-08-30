export default {
  input: 'lib/qunit-dom.js',

  external: ['qunit'],

  output: {
    file: 'dist/qunit-dom.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      qunit: 'QUnit',
    },
  },
};
