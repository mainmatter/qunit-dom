import babel from 'rollup-plugin-babel';

export default {
  input: 'lib/qunit-dom.js',

  external: ['qunit'],
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
  ],

  output: {
    file: 'dist/qunit-dom.js',
    format: 'iife',
    sourcemap: true,
  },
};
