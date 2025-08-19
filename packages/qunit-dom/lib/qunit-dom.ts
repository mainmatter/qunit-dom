/* global QUnit */
import install from './install.js';

export { setup } from './qunit-dom-modules.js';
export type { RootElement, Assert, DOMTarget } from './install.js';

install(QUnit.assert);
