import * as QUnit from 'qunit';

import textContains from './assertions/text-contains';

QUnit.extend(QUnit.assert, {
  dom: {
    pushResult: QUnit.assert.pushResult,

    textContains,
  }
});
