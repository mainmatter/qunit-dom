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

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text" required>';
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
  });
});
