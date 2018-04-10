/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasAttribute()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password">';
  });

  describe('string expected', () => {
    test('succeeds for correct name and value', () => {
      assert.dom('input').hasAttribute('type', 'password');
      assert.dom(document.querySelector('input')).hasAttribute('type', 'password');

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type" with value "password"',
        expected: 'Element input has attribute "type" with value "password"',
        message: 'Element input has attribute "type" with value "password"',
        result: true,
      }, {
        actual: 'Element input[type="password"] has attribute "type" with value "password"',
        expected: 'Element input[type="password"] has attribute "type" with value "password"',
        message: 'Element input[type="password"] has attribute "type" with value "password"',
        result: true,
      }]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasAttribute('type', 'text');
      assert.dom(document.querySelector('input')).hasAttribute('type', 'text');

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type" with value "password"',
        expected: 'Element input has attribute "type" with value "text"',
        message: 'Element input has attribute "type" with value "text"',
        result: false,
      }, {
        actual: 'Element input[type="password"] has attribute "type" with value "password"',
        expected: 'Element input[type="password"] has attribute "type" with value "text"',
        message: 'Element input[type="password"] has attribute "type" with value "text"',
        result: false,
      }]);
    });

    test('fails for missing attribute', () => {
      assert.dom('input').hasAttribute('foo', 'bar');
      assert.dom(document.querySelector('input')).hasAttribute('foo', 'bar');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have attribute "foo"',
        expected: 'Element input has attribute "foo" with value "bar"',
        message: 'Element input has attribute "foo" with value "bar"',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have attribute "foo"',
        expected: 'Element input[type="password"] has attribute "foo" with value "bar"',
        message: 'Element input[type="password"] has attribute "foo" with value "bar"',
        result: false,
      }]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for matching name and value', () => {
      assert.dom('input').hasAttribute('type', /^pass/);
      assert.dom(document.querySelector('input')).hasAttribute('type', /^pass/);

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type" with value "password"',
        expected: 'Element input has attribute "type" with value matching /^pass/',
        message: 'Element input has attribute "type" with value matching /^pass/',
        result: true,
      }, {
        actual: 'Element input[type="password"] has attribute "type" with value "password"',
        expected: 'Element input[type="password"] has attribute "type" with value matching /^pass/',
        message: 'Element input[type="password"] has attribute "type" with value matching /^pass/',
        result: true,
      }]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasAttribute('type', /mail$/);
      assert.dom(document.querySelector('input')).hasAttribute('type', /mail$/);

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type" with value "password"',
        expected: 'Element input has attribute "type" with value matching /mail$/',
        message: 'Element input has attribute "type" with value matching /mail$/',
        result: false,
      }, {
        actual: 'Element input[type="password"] has attribute "type" with value "password"',
        expected: 'Element input[type="password"] has attribute "type" with value matching /mail$/',
        message: 'Element input[type="password"] has attribute "type" with value matching /mail$/',
        result: false,
      }]);
    });

    test('fails for missing attribute', () => {
      assert.dom('input').hasAttribute('foo', /fo+/);
      assert.dom(document.querySelector('input')).hasAttribute('foo', /fo+/);

      expect(assert.results).toEqual([{
        actual: 'Element input does not have attribute "foo"',
        expected: 'Element input has attribute "foo" with value matching /fo+/',
        message: 'Element input has attribute "foo" with value matching /fo+/',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have attribute "foo"',
        expected: 'Element input[type="password"] has attribute "foo" with value matching /fo+/',
        message: 'Element input[type="password"] has attribute "foo" with value matching /fo+/',
        result: false,
      }]);
    });
  });

  describe('no value', () => {
    test('succeeds for existing attribute', () => {
      assert.dom('input').hasAttribute('type');
      assert.dom(document.querySelector('input')).hasAttribute('type');

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type"',
        expected: 'Element input has attribute "type"',
        message: 'Element input has attribute "type"',
        result: true,
      }, {
        actual: 'Element input[type="password"] has attribute "type"',
        expected: 'Element input[type="password"] has attribute "type"',
        message: 'Element input[type="password"] has attribute "type"',
        result: true,
      }]);
    });

    test('fails for missing attribute', () => {
      assert.dom('input').hasAttribute('disabled');
      assert.dom(document.querySelector('input')).hasAttribute('disabled');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have attribute "disabled"',
        expected: 'Element input has attribute "disabled"',
        message: 'Element input has attribute "disabled"',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have attribute "disabled"',
        expected: 'Element input[type="password"] has attribute "disabled"',
        message: 'Element input[type="password"] has attribute "disabled"',
        result: false,
      }]);
    });
  });

  describe('{ any: true }', () => {
    test('succeeds for existing attribute', () => {
      assert.dom('input').hasAttribute('type', { any: true }, 'custom message');
      assert.dom(document.querySelector('input')).hasAttribute('type', { any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input has attribute "type"',
        expected: 'Element input has attribute "type"',
        message: 'custom message',
        result: true,
      }, {
        actual: 'Element input[type="password"] has attribute "type"',
        expected: 'Element input[type="password"] has attribute "type"',
        message: 'custom message',
        result: true,
      }]);
    });

    test('fails for missing attribute', () => {
      assert.dom('input').hasAttribute('disabled', { any: true }, 'custom message');
      assert.dom(document.querySelector('input')).hasAttribute('disabled', { any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input does not have attribute "disabled"',
        expected: 'Element input has attribute "disabled"',
        message: 'custom message',
        result: false,
      }, {
        actual: 'Element input[type="password"] does not have attribute "disabled"',
        expected: 'Element input[type="password"] has attribute "disabled"',
        message: 'custom message',
        result: false,
      }]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasAttribute('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasAttribute('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasAttribute('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasAttribute('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasAttribute('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasAttribute('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });

  test('accepts SVGElement', () => {
    document.body.innerHTML = '<svg id="svg-element" width="100"></svg>';
    assert.dom(document.querySelector("#svg-element")).hasAttribute("width", "100");

    expect(assert.results).toEqual([{
      actual: 'Element svg#svg-element[width=\"100\"] has attribute "width" with value "100"',
      expected: 'Element svg#svg-element[width=\"100\"] has attribute "width" with value "100"',
      message: 'Element svg#svg-element[width=\"100\"] has attribute "width" with value "100"',
      result: true,
    }]);
  });
});
