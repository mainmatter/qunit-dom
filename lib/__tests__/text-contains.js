/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).textContains()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').textContains('foo', 'bar');

    expect(assert.results).toEqual([{
      actual: 'foo',
      expected: 'foo',
      message: 'bar',
      result: true,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
      element = document.querySelector('h1');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).textContains('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1.baz contains "foo"',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).textContains('oo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'oo',
        message: 'Element h1.baz contains "oo"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).textContains('bar');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'bar',
        message: 'Element h1.baz contains "bar"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).textContains('foo');

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    });

    test('succeeds for correct content', () => {
      assert.dom('h1').textContains('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1 contains "foo"',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom('h1').textContains('oo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'oo',
        message: 'Element h1 contains "oo"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').textContains('bar');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'bar',
        message: 'Element h1 contains "bar"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').textContains('foo');

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).textContains('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).textContains('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).textContains('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).textContains('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).textContains('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
