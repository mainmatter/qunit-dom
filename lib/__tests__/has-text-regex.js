/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasText()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').hasText(/fo+/, 'bar');

    expect(assert.results).toEqual([{
      actual: 'foo',
      expected: /fo+/,
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
      assert.dom(element).hasText(/fo+/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /fo+/,
        message: 'Element h1.baz has text matching /fo+/',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).hasText(/oo/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /oo/,
        message: 'Element h1.baz has text matching /oo/',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).hasText(/bar/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /bar/,
        message: 'Element h1.baz has text matching /bar/',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).hasText(/fo+/);

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
      assert.dom('h1').hasText(/fo+/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /fo+/,
        message: 'Element h1 has text matching /fo+/',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom('h1').hasText(/oo/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /oo/,
        message: 'Element h1 has text matching /oo/',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').hasText(/bar/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /bar/,
        message: 'Element h1 has text matching /bar/',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').hasText(/fo+/);

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasText(/fo+/)).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasText(/fo+/)).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasText(/fo+/)).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasText(/fo+/)).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasText(/fo+/)).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
