/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isNotFocused()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h1').isNotFocused('foo');

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

      assert.dom(element).isNotFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="email"] is not focused',
        result: true,
      }]);
    });

    test('fails if element is focused', () => {
      element.focus();

      assert.dom(element).isNotFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="email"] is not focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotFocused();

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

      assert.dom('input').isNotFocused();

      expect(assert.results).toEqual([{
        message: 'Element input is not focused',
        result: true,
      }]);
    });

    test('fails if element is focused', () => {
      document.querySelector('input').focus();

      assert.dom('input').isNotFocused();

      expect(assert.results).toEqual([{
        message: 'Element input is not focused',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotFocused();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isNotFocused()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isNotFocused()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotFocused()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isNotFocused()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isNotFocused()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
