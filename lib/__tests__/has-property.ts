/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasProperty()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password">';
  });

  describe('string expected', () => {
    test('succeeds for correct name and value', () => {
      assert.dom('input').hasProperty('type', 'password');
      assert.dom(document.querySelector('input')).hasProperty('type', 'password');

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type" with value "password"',
        expected: 'Element input has property "type" with value "password"',
        message: 'Element input has property "type" with value "password"',
        result: true,
      }, {
        actual: 'Element input[type="password"] has property "type" with value "password"',
        expected: 'Element input[type="password"] has property "type" with value "password"',
        message: 'Element input[type="password"] has property "type" with value "password"',
        result: true,
      }]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasProperty('type', 'text');
      assert.dom(document.querySelector('input')).hasProperty('type', 'text');

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type" with value "password"',
        expected: 'Element input has property "type" with value "text"',
        message: 'Element input has property "type" with value "text"',
        result: false,
      }, {
        actual: 'Element input[type="password"] has property "type" with value "password"',
        expected: 'Element input[type="password"] has property "type" with value "text"',
        message: 'Element input[type="password"] has property "type" with value "text"',
        result: false,
      }]);
    });

    test('fails for missing property', () => {
      assert.dom('input').hasProperty('foo', 'bar');
      assert.dom(document.querySelector('input')).hasProperty('foo', 'bar');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "foo"',
        expected: 'Element input has property "foo" with value "bar"',
        message: 'Element input has property "foo" with value "bar"',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have property "foo"',
        expected: 'Element input[type="password"] has property "foo" with value "bar"',
        message: 'Element input[type="password"] has property "foo" with value "bar"',
        result: false,
      }]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for matching name and value', () => {
      assert.dom('input').hasProperty('type', /^pass/);
      assert.dom(document.querySelector('input')).hasProperty('type', /^pass/);

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type" with value "password"',
        expected: 'Element input has property "type" with value matching /^pass/',
        message: 'Element input has property "type" with value matching /^pass/',
        result: true,
      }, {
        actual: 'Element input[type="password"] has property "type" with value "password"',
        expected: 'Element input[type="password"] has property "type" with value matching /^pass/',
        message: 'Element input[type="password"] has property "type" with value matching /^pass/',
        result: true,
      }]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasProperty('type', /mail$/);
      assert.dom(document.querySelector('input')).hasProperty('type', /mail$/);

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type" with value "password"',
        expected: 'Element input has property "type" with value matching /mail$/',
        message: 'Element input has property "type" with value matching /mail$/',
        result: false,
      }, {
        actual: 'Element input[type="password"] has property "type" with value "password"',
        expected: 'Element input[type="password"] has property "type" with value matching /mail$/',
        message: 'Element input[type="password"] has property "type" with value matching /mail$/',
        result: false,
      }]);
    });

    test('fails for missing property', () => {
      assert.dom('input').hasProperty('foo', /fo+/);
      assert.dom(document.querySelector('input')).hasProperty('foo', /fo+/);

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "foo"',
        expected: 'Element input has property "foo" with value matching /fo+/',
        message: 'Element input has property "foo" with value matching /fo+/',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have property "foo"',
        expected: 'Element input[type="password"] has property "foo" with value matching /fo+/',
        message: 'Element input[type="password"] has property "foo" with value matching /fo+/',
        result: false,
      }]);
    });
  });

  describe('no value', () => {
    test('succeeds for existing property', () => {
      assert.dom('input').hasProperty('type');
      assert.dom(document.querySelector('input')).hasProperty('type');

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type"',
        expected: 'Element input has property "type"',
        message: 'Element input has property "type"',
        result: true,
      }, {
        actual: 'Element input[type="password"] has property "type"',
        expected: 'Element input[type="password"] has property "type"',
        message: 'Element input[type="password"] has property "type"',
        result: true,
      }]);
    });

    test.only('fails for missing property', () => {
      debugger;
      assert.dom('input').hasProperty('disabled');
      assert.dom(document.querySelector('input')).hasProperty('disabled');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "disabled"',
        expected: 'Element input has property "disabled"',
        message: 'Element input has property "disabled"',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have property "disabled"',
        expected: 'Element input[type="password"] has property "disabled"',
        message: 'Element input[type="password"] has property "disabled"',
        result: false,
      }]);
    });
  });

  describe('{ any: true }', () => {
    test('succeeds for existing property', () => {
      assert.dom('input').hasProperty('type', { any: true }, 'custom message');
      assert.dom(document.querySelector('input')).hasProperty('type', { any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input has property "type"',
        expected: 'Element input has property "type"',
        message: 'custom message',
        result: true,
      }, {
        actual: 'Element input[type="password"] has property "type"',
        expected: 'Element input[type="password"] has property "type"',
        message: 'custom message',
        result: true,
      }]);
    });

    test('fails for missing property', () => {
      assert.dom('input').hasProperty('disabled', { any: true }, 'custom message');
      assert.dom(document.querySelector('input')).hasProperty('disabled', { any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have property "disabled"',
        expected: 'Element input has property "disabled"',
        message: 'custom message',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have property "disabled"',
        expected: 'Element input[type="password"] has property "disabled"',
        message: 'custom message',
        result: false,
      }]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasProperty('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing should exist',
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

  test('accepts SVGElement', () => {
    document.body.innerHTML = '<svg id="svg-element" width="100"></svg>';
    assert.dom(document.querySelector("#svg-element")).hasProperty("width", "100");

    expect(assert.results).toEqual([{
      actual: 'Element svg#svg-element[width=\"100\"] has property "width" with value "100"',
      expected: 'Element svg#svg-element[width=\"100\"] has property "width" with value "100"',
      message: 'Element svg#svg-element[width=\"100\"] has property "width" with value "100"',
      result: true,
    }]);
  });
});
