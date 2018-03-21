/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isNotRequired()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="text" required>';

    assert.dom('input').isNotRequired('custom message');

    expect(assert.results).toEqual([{
      actual: 'required',
      expected: 'not required',
      message: 'custom message',
      result: false,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
      element = document.querySelector('input');
    });

    test('succeeds if element is not required', () => {
      assert.dom(element).isNotRequired();

      expect(assert.results).toEqual([{
        actual: 'not required',
        expected: 'not required',
        message: 'Element input[type=\"text\"] is not required',
        result: true,
      }]);
    });

    test('fails if element is required', () => {
      element.required = true;
      assert.dom(element).isNotRequired();

      expect(assert.results).toEqual([{
        actual: 'required',
        expected: 'not required',
        message: 'Element input[type=\"text\"][required] is not required',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotRequired();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
    });

    test('succeeds if element is not required', () => {
      assert.dom('input').isNotRequired();

      expect(assert.results).toEqual([{
        actual: 'not required',
        expected: 'not required',
        message: 'Element input is not required',
        result: true,
      }]);
    });

    test('fails if element is required', () => {
      document.querySelector('input').required = true;
      assert.dom('input').isNotRequired();

      expect(assert.results).toEqual([{
        actual: 'required',
        expected: 'not required',
        message: 'Element input is not required',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotRequired();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isNotRequired()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isNotRequired()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotRequired()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isNotRequired()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isNotRequired()).toThrow('Unexpected Parameter: [object HTMLDocument]');
    expect(() => assert.dom(document.createElement('div')).isRequired()).toThrow('Unexpected Element Type: [object HTMLDivElement]');
  });
});
