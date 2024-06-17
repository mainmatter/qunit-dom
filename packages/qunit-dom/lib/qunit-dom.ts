/* global QUnit */
import { DOMAssertionsHandler } from './assertions.js';
import install from './install.js';

export { setup } from './qunit-dom-modules.js';
export {
  default,
  DOMAssertionsHandler,
  type RootElement,
  type FoundElement,
} from './assertions.js';

install(QUnit.assert, DOMAssertionsHandler);
