/* global QUnit */

import type DOMAssertions from './assertions';
import type { DOMAssertionOptions } from './assertions';
import install from './install';

export { setup } from './qunit-dom-modules';

declare global {
  interface Assert {
    dom(
      target?: string | Element | null,
      rootElement?: Element,
      options?: DOMAssertionOptions
    ): DOMAssertions;
  }
}

install(QUnit.assert);
