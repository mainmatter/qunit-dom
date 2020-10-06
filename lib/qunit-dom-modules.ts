import * as QUnit from 'qunit';
import attach from './install';

export { default as attach } from './install';

interface SetupOptions {}

export function setup(options: SetupOptions) {
  attach(QUnit.assert);
}
