/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasValue()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input class="input username">';
    document.querySelector('input.username').value = 'HSimpson';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input.username').hasValue('HSimpson');
      assert.dom(document.querySelector('input.username')).hasValue('HSimpson');

      expect(assert.results).toEqual([{
        actual: 'HSimpson',
        expected: 'HSimpson',
        message: 'Element input.username has value "HSimpson"',
        result: true,
      }, {
        actual: 'HSimpson',
        expected: 'HSimpson',
        message: 'Element input.input.username has value "HSimpson"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('input.username').hasValue('Bart');
      assert.dom(document.querySelector('input.username')).hasValue('Bart');

      expect(assert.results).toEqual([{
        actual: 'HSimpson',
        expected: 'Bart',
        message: 'Element input.username has value "Bart"',
        result: false,
      }, {
        actual: 'HSimpson',
        expected: 'Bart',
        message: 'Element input.input.username has value "Bart"',
        result: false,
      }]);
    });

    test('fails for wrong content if field is empty', () => {
      document.body.innerHTML = '<input>';

      assert.dom('input').hasValue('Bart');
      assert.dom(document.querySelector('input')).hasValue('Bart');

      expect(assert.results).toEqual([{
        actual: '',
        expected: 'Bart',
        message: 'Element input has value "Bart"',
        result: false,
      }, {
        actual: '',
        expected: 'Bart',
        message: 'Element input has value "Bart"',
        result: false,
      }]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input.username').hasValue(/.+Simpson/);
      assert.dom(document.querySelector('input.username')).hasValue(/.+Simpson/);

      expect(assert.results).toEqual([{
        actual: 'HSimpson',
        expected: /.+Simpson/,
        message: 'Element input.username has value matching /.+Simpson/',
        result: true,
      }, {
        actual: 'HSimpson',
        expected: /.+Simpson/,
        message: 'Element input.input.username has value matching /.+Simpson/',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('input.username').hasValue(/.+Burns/);
      assert.dom(document.querySelector('input.username')).hasValue(/.+Burns/);

      expect(assert.results).toEqual([{
        actual: 'HSimpson',
        expected: /.+Burns/,
        message: 'Element input.username has value matching /.+Burns/',
        result: false,
      }, {
        actual: 'HSimpson',
        expected: /.+Burns/,
        message: 'Element input.input.username has value matching /.+Burns/',
        result: false,
      }]);
    });
  });

  describe('no arguments', () => {
    test('succeeds for correct content', () => {
      assert.dom('input.username').hasValue();
      assert.dom(document.querySelector('input.username')).hasValue();

      expect(assert.results).toEqual([{
        actual: 'Element input.username has a value',
        expected: 'Element input.username has a value',
        message: 'Element input.username has a value',
        result: true,
      }, {
        actual: 'Element input.input.username has a value',
        expected: 'Element input.input.username has a value',
        message: 'Element input.input.username has a value',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      document.body.innerHTML = '<input class="input username">';

      assert.dom('input.username').hasValue();
      assert.dom(document.querySelector('input.username')).hasValue();

      expect(assert.results).toEqual([{
        actual: 'Element input.username has no value',
        expected: 'Element input.username has a value',
        message: 'Element input.username has a value',
        result: false,
      }, {
        actual: 'Element input.input.username has no value',
        expected: 'Element input.input.username has a value',
        message: 'Element input.input.username has a value',
        result: false,
      }]);
    });
  });

  describe('{ any: true }', () => {
    test('succeeds for correct content', () => {
      assert.dom('input.username').hasValue({ any: true }, 'custom message');
      assert.dom(document.querySelector('input.username')).hasValue({ any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input.username has a value',
        expected: 'Element input.username has a value',
        message: 'custom message',
        result: true,
      }, {
        actual: 'Element input.input.username has a value',
        expected: 'Element input.input.username has a value',
        message: 'custom message',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      document.body.innerHTML = '<input class="input username">';

      assert.dom('input.username').hasValue({ any: true }, 'custom message');
      assert.dom(document.querySelector('input.username')).hasValue({ any: true }, 'custom message');

      expect(assert.results).toEqual([{
        actual: 'Element input.username has no value',
        expected: 'Element input.username has a value',
        message: 'custom message',
        result: false,
      }, {
        actual: 'Element input.input.username has no value',
        expected: 'Element input.input.username has a value',
        message: 'custom message',
        result: false,
      }]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasValue('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasValue('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasValue('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasValue('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasValue('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasValue('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
