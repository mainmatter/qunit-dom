import * as QUnit from 'qunit';

import textContains from './assertions/text-contains';

QUnit.extend(QUnit.assert, {
  dom: {
    rootElement: document,
    pushResult: QUnit.assert.pushResult,

    textContains,
  }
});
