import * as QUnit from 'qunit';

import isFocused from './assertions/is-focused';
import isNotFocused from './assertions/is-not-focused';
import textContains from './assertions/text-contains';
import textMatches from './assertions/text-matches';

QUnit.extend(QUnit.assert, {
  dom: {
    rootElement: document,
    pushResult: QUnit.assert.pushResult,

    isFocused,
    isNotFocused,
    textContains,
    textMatches,
  }
});
