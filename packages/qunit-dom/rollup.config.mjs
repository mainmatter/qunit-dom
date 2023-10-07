import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

const typescriptConfiguration = {
  exclude: [
    'node_modules/**',
    'lib/**/__tests__/**',
    'lib/**/*.test.ts',
    'lib/helpers/test-assertions.ts',
  ],
};

const copyStaticArtifacts = copy({
  targets: [
    { src: '../../README.md', dest: '.' },
    { src: '../../LICENSE', dest: '.' },
  ],
});

const iifeBundle = {
  input: 'lib/qunit-dom.ts',

  external: ['qunit'],
  plugins: [typescript({
    ...typescriptConfiguration,
    tsconfigOverride: {
      compilerOptions: {
        declaration: false,
      }
    }
  }), copyStaticArtifacts],

  output: {
    name: 'QUnitDOM',
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
    file: 'dist/es/index.js',
    format: 'es',
    sourcemap: true,
  },
};

export default [iifeBundle, esBundle];
