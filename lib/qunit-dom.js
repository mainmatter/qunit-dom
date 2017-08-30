import * as QUnit from 'qunit';

import textContains from './assertions/text-contains';
import textMatches from './assertions/text-matches';

QUnit.extend(QUnit.assert, {
  dom: {
    rootElement: document,
    pushResult: QUnit.assert.pushResult,

    textContains,
    textMatches,
  }
});
