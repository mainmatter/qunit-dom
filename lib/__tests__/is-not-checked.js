/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isNotChecked()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="checkbox" checked>';

    assert.dom('input').isNotChecked('foo');

    expect(assert.results).toEqual([{
      actual: 'checked',
      expected: 'not checked',
      message: 'foo',
      result: false,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<input type="checkbox">';
      element = document.querySelector('input');
    });

    test('succeeds if element is not checked', () => {
      assert.dom(element).isNotChecked();

      expect(assert.results).toEqual([{
        actual: 'not checked',
        expected: 'not checked',
        message: 'Element input[type=\"checkbox\"] is not checked',
        result: true,
      }]);
    });

    test('fails if element is checked', () => {
      element.checked = true;
      assert.dom(element).isNotChecked();

      expect(assert.results).toEqual([{
        actual: 'checked',
        expected: 'not checked',
        message: 'Element input[type=\"checkbox\"] is not checked',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotChecked();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="checkbox">';
    });

    test('succeeds if element is not checked', () => {
      assert.dom('input').isNotChecked();

      expect(assert.results).toEqual([{
        actual: 'not checked',
        expected: 'not checked',
        message: 'Element input is not checked',
        result: true,
      }]);
    });

    test('fails if element is checked', () => {
      document.querySelector('input').checked = true;
      assert.dom('input').isNotChecked();

      expect(assert.results).toEqual([{
        actual: 'checked',
        expected: 'not checked',
        message: 'Element input is not checked',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotChecked();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isNotChecked()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isNotChecked()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotChecked()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isNotChecked()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isNotChecked()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });

});
