/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).includesText()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').includesText('foo', 'bar');

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
      assert.dom(element).includesText('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1.baz has text containing "foo"',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).includesText('oo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'oo',
        message: 'Element h1.baz has text containing "oo"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).includesText('bar');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'bar',
        message: 'Element h1.baz has text containing "bar"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).includesText('foo');

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
      assert.dom('h1').includesText('foo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'foo',
        message: 'Element h1 has text containing "foo"',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom('h1').includesText('oo');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'oo',
        message: 'Element h1 has text containing "oo"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').includesText('bar');

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: 'bar',
        message: 'Element h1 has text containing "bar"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').includesText('foo');

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).includesText('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).includesText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).includesText('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).includesText('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).includesText('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
