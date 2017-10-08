import * as QUnit from 'qunit';

import DOMAssertions from './assertions';

QUnit.extend(QUnit.assert, {
  dom(target, rootElement) {
    return new DOMAssertions(target, rootElement || this.dom.rootElement || document, this);
  }
});
