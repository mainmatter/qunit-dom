import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasNoValue()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input class="input username">';
  });

  test('succeeds for correct content', () => {
    assert.dom('input.username').hasNoValue();
    assert.dom(document.querySelector('input.username')).hasNoValue();

    expect(assert.results).toEqual([
      {
        actual: '',
        expected: '',
        message: 'Element input.username has value ""',
        result: true,
      },
      {
        actual: '',
        expected: '',
        message: 'Element input.input.username has value ""',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    (document.querySelector('input.username') as HTMLInputElement).value = 'HSimpson';

    assert.dom('input.username').hasNoValue();
    assert.dom(document.querySelector('input.username')).hasNoValue();

    expect(assert.results).toEqual([
      {
        actual: 'HSimpson',
        expected: '',
        message: 'Element input.username has value ""',
        result: false,
      },
      {
        actual: 'HSimpson',
        expected: '',
        message: 'Element input.input.username has value ""',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasNoValue();

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('fails for null', () => {
    assert.dom(null).hasNoValue();

    expect(assert.results).toEqual([
      {
        message: 'Element <unknown> should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasNoValue()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasNoValue()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasNoValue()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasNoValue()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasNoValue()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input value="foo" />';

    assert.dom('input').hasNoValue().hasNoValue();

    expect(assert.results.length).toEqual(2);
  });
});
