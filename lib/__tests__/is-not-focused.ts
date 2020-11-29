/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNotFocused()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').isNotFocused('foo');

    expect(assert.results).toEqual([
      {
        message: 'foo',
        result: true,
        actual: 'Element h1 is not focused',
        expected: 'Element h1 is not focused',
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      document.body.innerHTML = 'foo<input type="email">bar';
      element = document.querySelector('input');
    });

    test('succeeds if element is not focused', () => {
      document.body.focus();

      assert.dom(element).isNotFocused();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="email"] is not focused',
          result: true,
          actual: 'Element input[type="email"] is not focused',
          expected: 'Element input[type="email"] is not focused',
        },
      ]);
    });

    test('fails if element is focused', () => {
      element.focus();

      assert.dom(element).isNotFocused();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="email"] is not focused',
          result: false,
          actual: 'Element input[type="email"] is focused',
          expected: 'Element input[type="email"] is not focused',
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotFocused();

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
      document.body.innerHTML = 'foo<input type="email">bar';
    });

    test('succeeds if element is not focused', () => {
      document.body.focus();

      assert.dom('input').isNotFocused();

      expect(assert.results).toEqual([
        {
          message: 'Element input is not focused',
          result: true,
          actual: 'Element input is not focused',
          expected: 'Element input is not focused',
        },
      ]);
    });

    test('fails if element is focused', () => {
      document.querySelector('input').focus();

      assert.dom('input').isNotFocused();

      expect(assert.results).toEqual([
        {
          message: 'Element input is not focused',
          result: false,
          actual: 'Element input is focused',
          expected: 'Element input is not focused',
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotFocused();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="password"] should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isNotFocused()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isNotFocused()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotFocused()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isNotFocused()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isNotFocused()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').isNotFocused().isNotFocused();

    expect(assert.results.length).toEqual(2);
  });
});
