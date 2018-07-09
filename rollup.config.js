import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'lib/qunit-dom.ts',

  external: ['qunit'],
  plugins: [
    typescript({
      exclude: [
        'node_modules/**',
        'lib/__tests__/**',
        'lib/**/*.test.ts',
        'lib/helpers/test-assertions.ts',
      ],
    }),
  ],

  output: {
    file: 'dist/qunit-dom.js',
    format: 'iife',
    sourcemap: true,
  },
};
