import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

/*
 * JSDom based tests aren't able to discern visibility as we define it. Specifically,
 * the JSDom tests don't do layouting, therefore calculating `offsetWdith` or `offsetHeight`
 * won't work. As a result, we need to use Ember's test infrastructure to correctly assess
 * visibility, as those tests run in a browser environment.
 *
 * Tests for the success cases of isNotVisible can be found in tests/acceptance/qunit-dom-test.js
 */
describe('assert.dom(...).isNotVisible()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('selector only', () => {
    test('succeeds if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').isNotVisible();

      expect(assert.results).toEqual([
        {
          actual: 'Element h2 is not visible',
          expected: 'Element h2 is not visible',
          message: 'Element h2 is not visible',
          result: true,
        },
      ]);
    });
  });

  describe('element only', () => {
    test('succeeds if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom(null).isNotVisible();

      expect(assert.results).toEqual([
        {
          actual: 'Element <not found> is not visible',
          expected: 'Element <not found> is not visible',
          message: 'Element <not found> is not visible',
          result: true,
        },
      ]);
    });
  });

  describe('custom messages', () => {
    test('shows custom messages', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').isNotVisible('foo');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1 is not visible',
          expected: 'Element h1 is not visible',
          message: 'foo',
          result: true,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isNotVisible()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isNotVisible()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotVisible()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isNotVisible()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isNotVisible()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').isNotVisible().isNotVisible();

    expect(assert.results.length).toEqual(2);
  });
});
