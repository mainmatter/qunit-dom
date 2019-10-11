import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | qunit-dom', function(hooks) {
  setupApplicationTest(hooks);

  test('qunit-dom assertions are available', async function(assert) {
    assert.ok(assert.dom, 'assert.dom is available');
    assert.ok(assert.dom('.foo').includesText, 'assert.dom(...).includesText is available');

    assert.dom('#qunit').doesNotExist('rootElement is set to #ember-testing-container');

    assert.dom().hasAttribute('id', 'ember-testing');

    await visit('/');

    assert.dom('#title').exists();
    assert.dom('#subtitle').doesNotExist();
    assert.dom('#title').hasText('Welcome to Ember');
    assert.dom('#title').hasTagName('h2');

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
    assert.dom('p').isVisible({ count: 2 });

    let titleElement = document.querySelector('#title');
    assert.dom(titleElement).isVisible();

    /*
     * JSDom does not implement pseudo elements and this can only be tested in a real browser.
     * See this: https://github.com/jsdom/jsdom/issues/1928
     */
    assert.dom('#with-pseudo-element').hasPseudoElementStyle(':after', { content: '";"' });
  });
});
