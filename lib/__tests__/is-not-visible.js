/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNotVisible()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('selector only', () => {
    test('fails if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').isNotVisible();

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  describe('custom messages', () => {
    test('shows custom messages', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').isNotVisible('foo');

      expect(assert.results).toEqual([{
        actual: 'Element h1 is not visible',
        expected: 'Element h1 is not visible',
        message: 'foo',
        result: true,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isNotVisible()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isNotVisible()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotVisible()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isNotVisible()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isNotVisible()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
