/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).includesText()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').includesText('foo', 'bar');

    expect(assert.results).toEqual([
      {
        actual: 'foo',
        expected: 'foo',
        message: 'bar',
        result: true,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: Element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
      element = document.querySelector('h1');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).includesText('foo');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'foo',
          message: 'Element h1.baz has text containing "foo"',
          result: true,
        },
      ]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).includesText('oo');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'oo',
          message: 'Element h1.baz has text containing "oo"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).includesText('bar');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'bar',
          message: 'Element h1.baz has text containing "bar"',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).includesText('foo');

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with HTMLElement with irregular-spacing', () => {
    let element: Element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo\n  <span>bar</span>\n</h1>baz';
      element = document.querySelector('h1');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).includesText('foo bar');

      expect(assert.results).toEqual([
        {
          actual: 'foo bar',
          expected: 'foo bar',
          message: 'Element h1.baz has text containing "foo bar"',
          result: true,
        },
      ]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom(element).includesText('oo b');

      expect(assert.results).toEqual([
        {
          actual: 'foo bar',
          expected: 'oo b',
          message: 'Element h1.baz has text containing "oo b"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).includesText('baz');

      expect(assert.results).toEqual([
        {
          actual: 'foo bar',
          expected: 'baz',
          message: 'Element h1.baz has text containing "baz"',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).includesText('foo');

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });

    test('explains failures to the user via `console.warn` if expected text contains collapsable whitespace', () => {
      const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      assert.dom(element).includesText('foo\n  bar');

      expect(warnSpy.mock.calls[0][0]).toMatch('whitespace');
      warnSpy.mockRestore();
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    });

    test('succeeds for correct content', () => {
      assert.dom('h1').includesText('foo');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'foo',
          message: 'Element h1 has text containing "foo"',
          result: true,
        },
      ]);
    });

    test('succeeds for correct partial content', () => {
      assert.dom('h1').includesText('oo');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'oo',
          message: 'Element h1 has text containing "oo"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').includesText('bar');

      expect(assert.results).toEqual([
        {
          actual: 'foo',
          expected: 'bar',
          message: 'Element h1 has text containing "bar"',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').includesText('foo');

      expect(assert.results).toEqual([
        {
          message: 'Element h2 should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).includesText('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).includesText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).includesText('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).includesText('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).includesText('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').includesText('foo').includesText('bar');

    expect(assert.results.length).toEqual(2);
  });
});
