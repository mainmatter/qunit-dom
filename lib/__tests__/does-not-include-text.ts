/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotIncludeText()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').doesNotIncludeText('baz', 'bing');

    expect(assert.results).toEqual([
      {
        actual: 'Element h1 does not include text "baz"',
        expected: 'Element h1 does not include text "baz"',
        message: 'bing',
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
      assert.dom(element).doesNotIncludeText('baz');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1.baz does not include text "baz"',
          expected: 'Element h1.baz does not include text "baz"',
          message: 'Element h1.baz does not include text "baz"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).doesNotIncludeText('foo');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1.baz includes text "foo"',
          expected: 'Element h1.baz does not include text "foo"',
          message: 'Element h1.baz does not include text "foo"',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).doesNotIncludeText('foo');

      expect(assert.results).toEqual([
        {
          message: 'Element <not found> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    });

    test('succeeds for correct content', () => {
      assert.dom('h1').doesNotIncludeText('bar');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1 does not include text "bar"',
          expected: 'Element h1 does not include text "bar"',
          message: 'Element h1 does not include text "bar"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').doesNotIncludeText('foo');

      expect(assert.results).toEqual([
        {
          actual: 'Element h1 includes text "foo"',
          expected: 'Element h1 does not include text "foo"',
          message: 'Element h1 does not include text "foo"',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('h2').doesNotIncludeText('foo');

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
    expect(() => assert.dom(5).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).doesNotIncludeText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotIncludeText('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).doesNotIncludeText('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).doesNotIncludeText('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').doesNotIncludeText('foo').doesNotIncludeText('bar');

    expect(assert.results.length).toEqual(2);
  });
});
