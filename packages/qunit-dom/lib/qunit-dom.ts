/* global QUnit */
import install from './install.js';

export { setup } from './qunit-dom-modules.js';
export { default, DOMAssertionsHandler, type AssertionHandler } from './assertions.js';

install(QUnit.assert);
