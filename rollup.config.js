import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'lib/qunit-dom.js',

  external: ['qunit'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
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
