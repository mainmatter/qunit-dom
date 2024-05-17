/* global QUnit */
import install from './install.js';

export { setup } from './qunit-dom-modules.js';
export { default, DOMAssertionsHandler, type AssertionHandler } from './assertions.js';

import DOMAssertions from './assertions.js';

declare global {
  type QUnitDOMAssertTarget = string | Element | null;
  type RootElement = Element | Document | ShadowRoot | null;

  // overwrite the global QUnit interface
  interface Assert {
    dom(target?: QUnitDOMAssertTarget, rootElement?: RootElement): DOMAssertions;
  }
}

install(QUnit.assert);
