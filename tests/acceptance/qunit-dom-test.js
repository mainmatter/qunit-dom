import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | qunit-dom');

test('qunit-dom assertions are available', function(assert) {
  assert.expect(5);

  assert.ok(assert.dom, 'assert.dom is available');
  assert.ok(assert.dom('.foo').textContains, 'assert.dom(...).textContains is available');

  visit('/');
  andThen(() => {
    assert.dom('#title').exists();
    assert.dom('#subtitle').missing();
    assert.dom('#title').textContains('Welcome');
  });
});
