import * as QUnit from 'qunit';

import DOMAssertions from './assertions';

QUnit.extend(QUnit.assert, {
  dom(target, rootElement) {
    rootElement = rootElement || this.dom.rootElement || document;
    return new DOMAssertions(target || rootElement, rootElement, this);
  }
});
