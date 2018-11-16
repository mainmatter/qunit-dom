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
        message: 'Element <unknown> should exist',
        result: false,
      }]);
    });
  });

  describe('with HTMLElement with irregular-spacing', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo\n  <span>bar</span>\n</h1>baz';
      element = document.querySelector('h1');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).includesText('foo bar');

      expect(assert.results).toEqual([{
        actual: 'foo bar',
        expected: 'foo bar',
        message: 'Element h1.baz has text containing "foo bar"',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).includesText('oo b');

      expect(assert.results).toEqual([{
        actual: 'foo bar',
        expected: 'oo b',
        message: 'Element h1.baz has text containing "oo b"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).includesText('baz');

      expect(assert.results).toEqual([{
        actual: 'foo bar',
        expected: 'baz',
        message: 'Element h1.baz has text containing "baz"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).includesText('foo');

      expect(assert.results).toEqual([{
        message: 'Element <unknown> should exist',
        result: false,
      }]);
    });
  });

  describe('with HTMLElement with expected spacing', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<div>foo\n  <pre>bar\n  baz</pre></div>';
      element = document.querySelector('div');
    });

    test('explains failures to the user', () => {
      assert.dom(element).includesText('bar\n  baz');

      expect(assert.results).toEqual([{
        actual: 'foo bar baz',
        expected: 'bar\n  baz',
        message: 'Element div has text containing "bar\n  baz" -- Your expected text contains spacing that is not preserved in this assertion. Try the `.hasText()` assertion passing in your expected text as a RegEx pattern.',
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
        message: 'Element h2 should exist',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).includesText('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).includesText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).includesText('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).includesText('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).includesText('foo')).toThrow('Unexpected Parameter: [object Document]');
  });
});
