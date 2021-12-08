/* global QUnit */

import type DOMAssertions from './assertions';
import type { ExternalQuery } from './query';
import install from './install';

export { setup } from './qunit-dom-modules';

declare global {
  interface Assert {
    dom(target?: string | Element | null | ExternalQuery, rootElement?: Element): DOMAssertions;
  }
}

install(QUnit.assert);
