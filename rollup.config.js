import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/qunit-dom.js',

  external: ['qunit'],
  plugins: [
    commonjs(),
  ],

  output: {
    file: 'dist/qunit-dom.js',
    format: 'iife',
    sourcemap: true,
    globals: {
      qunit: 'QUnit',
    },
  },
};
