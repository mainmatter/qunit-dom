/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isRequired()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input>';

    assert.dom('input').isRequired('custom message');

    expect(assert.results).toEqual([{
      actual: 'not required',
      expected: 'required',
      message: 'custom message',
      result: false,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" required>';
      element = document.querySelector('input');
    });

    test('succeeds if element is required', () => {
      assert.dom(element).isRequired();

      expect(assert.results).toEqual([{
        actual: 'required',
        expected: 'required',
        message: 'Element input[type=\"text\"][required] is required',
        result: true,
      }]);
    });

    test('fails if element is not required', () => {
      element.required = false;
      assert.dom(element).isRequired();

      expect(assert.results).toEqual([{
        actual: 'not required',
        expected: 'required',
        message: 'Element input[type=\"text\"] is required',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isRequired();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text" required>';
    });

    test('succeeds if element is required', () => {
      assert.dom('input').isRequired();

      expect(assert.results).toEqual([{
        actual: 'required',
        expected: 'required',
        message: 'Element input is required',
        result: true,
      }]);
    });

    test('fails if element is not required', () => {
      document.querySelector('input').required = false;
      assert.dom('input').isRequired();

      expect(assert.results).toEqual([{
        actual: 'not required',
        expected: 'required',
        message: 'Element input is required',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isRequired();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isRequired()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isRequired()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isRequired()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isRequired()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isRequired()).toThrow('Unexpected Parameter: [object HTMLDocument]');
    expect(() => assert.dom(document.createElement('div')).isRequired()).toThrow('Unexpected Element Type: [object HTMLDivElement]');
  });
});
