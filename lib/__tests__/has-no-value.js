/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasNoValue()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input class="input username">';
  });

  test('succeeds for correct content', () => {
    assert.dom('input.username').hasNoValue();
    assert.dom(document.querySelector('input.username')).hasNoValue();

    expect(assert.results).toEqual([{
      actual: '',
      expected: '',
      message: 'Element input.username has value ""',
      result: true,
    }, {
      actual: '',
      expected: '',
      message: 'Element input.input.username has value ""',
      result: true,
    }]);
  });

  test('fails for wrong content', () => {
    document.querySelector('input.username').value = 'HSimpson';

    assert.dom('input.username').hasNoValue();
    assert.dom(document.querySelector('input.username')).hasNoValue();

    expect(assert.results).toEqual([{
      actual: 'HSimpson',
      expected: '',
      message: 'Element input.username has value ""',
      result: false,
    }, {
      actual: 'HSimpson',
      expected: '',
      message: 'Element input.input.username has value ""',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasNoValue();

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasNoValue()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasNoValue()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasNoValue()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasNoValue()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasNoValue()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
