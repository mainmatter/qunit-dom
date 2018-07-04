/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

/*
 * JSDom based tests aren't able to discern visibility as we define it. Specifically,
 * the JSDom tests don't do layouting, therefore calculating `offsetWdith` or `offsetHeight`
 * won't work. As a result, we need to use Ember's test infrastructure to correctly assess
 * visibility, as those tests run in a browser environment.
 *
 * Tests for the success cases of isVisible can be found in tests/acceptance/qunit-dom-test.js
 */
describe('assert.dom(...).isVisible()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('selector only', () => {
    test('fails if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').isVisible();

      expect(assert.results).toEqual([{
        actual: 'Element h2 is not visible',
        expected: 'Element h2 is visible',
        message: 'Element h2 is visible',
        result: false
      }]);
    });
  });

  describe('custom messages', () => {
    test('shows custom messages', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').isVisible('foo');

      expect(assert.results).toEqual([{
        actual: 'Element h1 is not visible',
        expected: 'Element h1 is visible',
        message: 'foo',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isVisible()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isVisible()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isVisible()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isVisible()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isVisible()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});