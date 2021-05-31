import QUnit from 'qunitx';
import { module, test } from 'qunitx';
import { setup } from '../dist/qunit-dom-modules';

module('Acceptance | qunit-dom', function (hooks) {
  setup(QUnit.assert);

  test('qunit-dom assertions are available', async function (assert) {
    document.querySelector('#ember-testing').innerHTML = `
      <h2 id="title">
        Welcome to <b>Ember</b>
      </h2>
      <p id="display-none" style="display: none;">You can't see me.</p>
      <div style="display: none;">
        <p id="display-descendant" style="display: block;">You can't see me.</p>
      </div>
      <p id="display-block" style="display: block;">You can see me.</p>
      <p>You can see me, too.</p>
      <input id="hidden-input" type="hidden">

      <style>
        #with-pseudo-element::after { content: ";"; }
      </style>
      <div id="with-pseudo-element">There is more to me.</div>
    `;

    assert.ok(assert.dom, 'assert.dom is available');
    assert.ok(assert.dom('.foo').includesText, 'assert.dom(...).includesText is available');

    assert.dom('#qunit').doesNotExist('rootElement is set to #ember-testing-container');
    assert.dom().hasAttribute('id', 'ember-testing');

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

    /*
     * JSDom does not implement pseudo elements and this can only be tested in a real browser.
     * See this: https://github.com/jsdom/jsdom/issues/1928
     */
    assert.dom('#with-pseudo-element').hasPseudoElementStyle(':after', { content: '";"' });

    assert.throws(() => assert.dom('foo', 'bar'), /bar is not a valid root element/);
  });
});
