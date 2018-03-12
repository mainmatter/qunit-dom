/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isChecked()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="checkbox">';

    assert.dom('input').isChecked('foo');

    expect(assert.results).toEqual([{
      actual: 'not checked',
      expected: 'checked',
      message: 'foo',
      result: false,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<input type="checkbox" checked>';
      element = document.querySelector('input');
    });

    test('succeeds if element is checked', () => {
      assert.dom(element).isChecked();

      expect(assert.results).toEqual([{
        actual: 'checked',
        expected: 'checked',
        message: 'Element input[type=\"checkbox\"][checked] is checked',
        result: true,
      }]);
    });

    test('fails if element is not checked', () => {
      element.checked = false;
      assert.dom(element).isChecked();

      expect(assert.results).toEqual([{
        actual: 'not checked',
        expected: 'checked',
        message: 'Element input[type=\"checkbox\"][checked] is checked',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isChecked();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="checkbox" checked>';
    });

    test('succeeds if element is checked', () => {
      assert.dom('input').isChecked();

      expect(assert.results).toEqual([{
        actual: 'checked',
        expected: 'checked',
        message: 'Element input is checked',
        result: true,
      }]);
    });

    test('fails if element is not checked', () => {
      document.querySelector('input').checked = false;
      assert.dom('input').isChecked();

      expect(assert.results).toEqual([{
        actual: 'not checked',
        expected: 'checked',
        message: 'Element input is checked',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isChecked();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isChecked()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isChecked()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isChecked()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isChecked()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isChecked()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });

});
