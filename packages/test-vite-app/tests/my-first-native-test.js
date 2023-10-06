import { module, test } from 'qunit/qunit/qunit.js';

module('a module', function() {
  test('it works', function (assert) {
    assert.ok(1);
  });

  test('dom assertions work', function (assert) {
    /**
      * We didn't render anything into the 
      * test container, so we shouldn't 
      * expect anything to be there
      */
    assert.dom().hasNoText();
  });
});



