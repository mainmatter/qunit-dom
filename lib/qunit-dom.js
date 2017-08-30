import * as QUnit from 'qunit';

import textContains from './assertions/text-contains';

QUnit.extend(QUnit.assert, {
  textContains,

  foo() {
    this.pushResult({ result: false, message: 'foo' });
  },
});
