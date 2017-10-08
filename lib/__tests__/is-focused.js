/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isFocused()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').isFocused('foo');

    expect(assert.results).toEqual([{
      actual: 'body',
      expected: 'h1',
      message: 'foo',
      result: false,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = 'foo<input type="email">bar';
      element = document.querySelector('input');
    });

    test('succeeds if element is focused', () => {
      element.focus();

      assert.dom(element).isFocused();

      expect(assert.results).toEqual([{
        actual: 'input[type="email"]',
        expected: 'input[type="email"]',
        message: 'Element input[type="email"] is focused',
        result: true,
      }]);
    });

    test('fails if element is not focused', () => {
      document.body.focus();

      assert.dom(element).isFocused();

      expect(assert.results).toEqual([{
        actual: 'body',
        expected: 'input[type="email"]',
        message: 'Element input[type="email"] is focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isFocused();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = 'foo<input type="email">bar';
    });

    test('succeeds if element is focused', () => {
      document.querySelector('input').focus();

      assert.dom('input').isFocused();

      expect(assert.results).toEqual([{
        actual: 'input[type="email"]',
        expected: 'input',
        message: 'Element input is focused',
        result: true,
      }]);
    });

    test('fails if element is not focused', () => {
      document.body.focus();

      assert.dom('input').isFocused();

      expect(assert.results).toEqual([{
        actual: 'body',
        expected: 'input',
        message: 'Element input is focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isFocused()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isFocused()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isFocused()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isFocused()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isFocused()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
