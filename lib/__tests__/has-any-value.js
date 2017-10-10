/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasAnyValue()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input class="input username">';
    document.querySelector('input.username').value = 'HSimpson';
  });

  test('succeeds for correct content', () => {
    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(document.querySelector('input.username')).hasAnyValue('custom message');

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

    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(document.querySelector('input.username')).hasAnyValue('custom message');

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

  test('fails for missing element', () => {
    assert.dom('#missing').hasAnyValue();

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasAnyValue()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasAnyValue()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasAnyValue()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasAnyValue()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasAnyValue()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
