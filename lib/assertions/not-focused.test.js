/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).notFocused()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').notFocused('foo');

    expect(assert.results).toEqual([{
      message: 'foo',
      result: true,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = 'foo<input type="email">bar';
      element = document.querySelector('input');
    });

    test('succeeds if element is not focused', () => {
      document.body.focus();

      assert.dom(element).notFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="email"] is not focused',
        result: true,
      }]);
    });

    test('fails if element is focused', () => {
      element.focus();

      assert.dom(element).notFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="email"] is not focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).notFocused();

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

    test('succeeds if element is not focused', () => {
      document.body.focus();

      assert.dom('input').notFocused();

      expect(assert.results).toEqual([{
        message: 'Element input is not focused',
        result: true,
      }]);
    });

    test('fails if element is focused', () => {
      document.querySelector('input').focus();

      assert.dom('input').notFocused();

      expect(assert.results).toEqual([{
        message: 'Element input is not focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').notFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).notFocused()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).notFocused()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).notFocused()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).notFocused()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).notFocused()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
