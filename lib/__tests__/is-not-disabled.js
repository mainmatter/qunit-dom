/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isNotDisabled()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="text" disabled>';

    assert.dom('input').isNotDisabled('custom message');

    expect(assert.results).toEqual([{
      actual: 'Element input is disabled',
      expected: 'Element input is not disabled',
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

    test('succeeds if element is not disabled', () => {
      assert.dom(element).isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input[type=\"text\"] is not disabled',
        expected: 'Element input[type=\"text\"] is not disabled',
        message: 'Element input[type=\"text\"] is not disabled',
        result: true,
      }]);
    });

    test('fails if element is disabled', () => {
      element.disabled = true;
      assert.dom(element).isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input[type=\"text\"][disabled] is disabled',
        expected: 'Element input[type=\"text\"][disabled] is not disabled',
        message: 'Element input[type=\"text\"][disabled] is not disabled',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotDisabled();

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });

    test('fails if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      element = document.querySelector('input');

      assert.dom('input').isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is disabled',
        expected: 'Element input is not disabled',
        message: 'Element input is not disabled',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
    });

    test('succeeds if element is not disabled', () => {
      assert.dom('input').isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is not disabled',
        expected: 'Element input is not disabled',
        message: 'Element input is not disabled',
        result: true,
      }]);
    });

    test('fails if element is disabled', () => {
      document.querySelector('input').disabled = true;
      assert.dom('input').isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is disabled',
        expected: 'Element input is not disabled',
        message: 'Element input is not disabled',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotDisabled();

      expect(assert.results).toEqual([{
        message: 'Element input[type="password"] exists',
        result: false,
      }]);
    });

    test('fails if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      assert.dom('input').isNotDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is disabled',
        expected: 'Element input is not disabled',
        message: 'Element input is not disabled',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isNotDisabled()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isNotDisabled()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotDisabled()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isNotDisabled()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isNotDisabled()).toThrow('Unexpected Parameter: [object HTMLDocument]');
    expect(() => assert.dom(document.createElement('div')).isNotDisabled()).toThrow('Unexpected Element Type: [object HTMLDivElement]');
  });
});
