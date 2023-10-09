import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

/*
 * JSDom based tests aren't able to discern visibility as we define it. Specifically,
 * the JSDom tests don't do layouting, therefore calculating `offsetWdith` or `offsetHeight`
 * won't work. As a result, we need to use Ember's test infrastructure to correctly assess
 * visibility, as those tests run in a browser environment.
 *
 * Additional tests cases of isVisible can be found in tests/acceptance/qunit-dom-test.js
 */
describe('assert.dom(...).isVisible()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('with selector', () => {
    test('fails if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').isVisible();

      expect(assert.results).toEqual([
        {
          actual: 'Element h2 is not visible',
          expected: 'Element h2 is visible',
          message: 'Element h2 is visible',
          result: false,
        },
      ]);
    });
  });

  describe('custom messages', () => {
    test('shows custom messages', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').isVisible('foo');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1 is not visible',
          expected: 'Element h1 is visible',
          message: 'foo',
          result: false,
        },
      ]);
    });
  });

  describe('with Element', () => {
    test('fails for missing element', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom(null).isVisible();

      expect(assert.results).toEqual([
        {
          actual: 'Element <not found> is not visible',
          expected: 'Element <not found> is visible',
          message: 'Element <not found> is visible',
          result: false,
        },
      ]);
    });
  });

  describe('with count option', () => {
    test('fails if element is missing', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('span').isVisible({ count: 3 });

      expect(assert.results).toEqual([
        {
          actual: 'Element span is not visible',
          expected: 'Element span is visible 3 times',
          message: 'Element span is visible 3 times',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isVisible()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isVisible()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isVisible()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isVisible()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignores
    expect(() => assert.dom(document).isVisible()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').isVisible().isVisible();

    expect(assert.results.length).toEqual(2);
  });
});
