import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | qunit-dom');

test('qunit-dom assertions are available', function(assert) {
  assert.expect(13);

  assert.ok(assert.dom, 'assert.dom is available');
  assert.ok(assert.dom('.foo').includesText, 'assert.dom(...).includesText is available');

  assert.dom('#qunit').doesNotExist('rootElement is set to #ember-testing-container');

  assert.dom().hasAttribute('id', 'ember-testing');

  visit('/');
  andThen(() => {
    assert.dom('#title').exists();
    assert.dom('#subtitle').doesNotExist();
    assert.dom('#title').hasText('Welcome to Ember');

    /*
     * JSDom based tests aren't able to discern visibility as we define it. Specifically,
     * the JSDom tests don't do layouting, therefore calculating `offsetWdith` or `offsetHeight`
     * won't work. As a result, we need to use Ember's test infrastructure to correctly assess
     * visibility, as those tests run in a browser environment.
     */
    assert.dom('#title').isVisible();
    assert.dom('#display-block').isVisible();
    assert.dom('#missing').isNotVisible();
    assert.dom('#display-none').isNotVisible();
    assert.dom('#display-descendant').isNotVisible();
    assert.dom('#hidden-input').isNotVisible();
  });
});