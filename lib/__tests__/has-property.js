/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasProperty()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="checkbox">';
  });

  describe('no value specified', () => {
    test('succeeds for a property that exists', () => {
      assert.dom('input').hasProperty('checked');
      assert.dom(document.querySelector('input')).hasProperty('checked');

      expect(assert.results).toEqual([{
        actual: 'Element input has property "checked"',
        expected: 'Element input has property "checked"',
        message: 'Element input has property "checked"',
        result: true,
      }, {
        actual: 'Element input[type="checkbox"] has property "checked"',
        expected: 'Element input[type="checkbox"] has property "checked"',
        message: 'Element input[type="checkbox"] has property "checked"',
        result: true,
      }]);
    });
    test('fails for a property that does not exist', () => {
      assert.dom('input').hasProperty('llama');
      assert.dom(document.querySelector('input')).hasProperty('llama');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "llama"',
        expected: 'Element input has property "llama"',
        message: 'Element input has property "llama"',
        result: false,
      }, {
        actual: 'Element input[type="checkbox"] does not have property "llama"',
        expected: 'Element input[type="checkbox"] has property "llama"',
        message: 'Element input[type="checkbox"] has property "llama"',
        result: false,
      }]);
    });
  });

  describe('value specified', () => {
    test('succeeds for correct value', () => {
      assert.dom('input').hasProperty('checked', { value: false });
      assert.dom(document.querySelector('input')).hasProperty('checked', { value: false });

      expect(assert.results).toEqual([{
        actual: 'Element input has property "checked" with value false',
        expected: 'Element input has property "checked" with value false',
        message: 'Element input has property "checked" with value false',
        result: true,
      }, {
        actual: 'Element input[type="checkbox"] has property "checked" with value false',
        expected: 'Element input[type="checkbox"] has property "checked" with value false',
        message: 'Element input[type="checkbox"] has property "checked" with value false',
        result: true,
      }]);
    });
    test('fails for a property that does not exist', () => {
      assert.dom('input').hasProperty('ghost', { value: true });
      assert.dom(document.querySelector('input')).hasProperty('ghost', { value: true });

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "ghost"',
        expected: 'Element input has property "ghost" with value true',
        message: 'Element input has property "ghost" with value true',
        result: false,
      }, {
        actual: 'Element input[type="checkbox"] does not have property "ghost"',
        expected: 'Element input[type="checkbox"] has property "ghost" with value true',
        message: 'Element input[type="checkbox"] has property "ghost" with value true',
        result: false,
      }]);
    });
  });

  describe('custom message', () => {
    it('uses the custom message', () => {
      assert.dom('input').hasProperty('checked', { value: false, message: 'Element is not checked. This is a good element.' });
      assert.dom('input').hasProperty('checked', { message: 'Element has the right property. This is a good element.' });

      expect(assert.results).toEqual([{
        actual: 'Element input has property "checked" with value false',
        expected: 'Element input has property "checked" with value false',
        message: 'Element is not checked. This is a good element.',
        result: true,
      }, {
        actual: 'Element input has property "checked"',
        expected: 'Element input has property "checked"',
          message: 'Element has the right property. This is a good element.',
        result: true,
      }]);
    });
  });


  test('fails for missing element', () => {
    assert.dom('#missing').hasProperty('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasProperty('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasProperty('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasProperty('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasProperty('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasProperty('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});