/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).textMatches()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').textMatches(/fo+/, 'bar');

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
      assert.dom(element).textMatches(/fo+/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /fo+/,
        message: 'Element h1.baz matches /fo+/',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).textMatches(/oo/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /oo/,
        message: 'Element h1.baz matches /oo/',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).textMatches(/bar/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /bar/,
        message: 'Element h1.baz matches /bar/',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).textMatches(/fo+/);

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
      assert.dom('h1').textMatches(/fo+/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /fo+/,
        message: 'Element h1 matches /fo+/',
        result: true,
      }]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom('h1').textMatches(/oo/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /oo/,
        message: 'Element h1 matches /oo/',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').textMatches(/bar/);

      expect(assert.results).toEqual([{
        actual: 'foo',
        expected: /bar/,
        message: 'Element h1 matches /bar/',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').textMatches(/fo+/);

      expect(assert.results).toEqual([{
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).textMatches(/fo+/)).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).textMatches(/fo+/)).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).textMatches(/fo+/)).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).textMatches(/fo+/)).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).textMatches(/fo+/)).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
