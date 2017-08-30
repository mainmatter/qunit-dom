import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | qunit-dom');

test('qunit-dom assertions are available', function(assert) {
  assert.expect(3);

  assert.ok(assert.dom, 'assert.dom is available');
  assert.ok(assert.dom.textContains, 'assert.dom.textContains is available');

  visit('/');
  andThen(() => {
    assert.dom.textContains('#title', 'Welcome');
  });
});
