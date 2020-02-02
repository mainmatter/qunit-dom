/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasAnyValue()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input class="input username">';
    (document.querySelector('input.username') as HTMLInputElement).value = 'HSimpson';
  });

  test('succeeds for correct content', () => {
    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(document.querySelector('input.username')).hasAnyValue('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element input.username has a value',
        expected: 'Element input.username has a value',
        message: 'custom message',
        result: true,
      },
      {
        actual: 'Element input.input.username has a value',
        expected: 'Element input.input.username has a value',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    document.body.innerHTML = '<input class="input username">';

    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(document.querySelector('input.username')).hasAnyValue('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element input.username has no value',
        expected: 'Element input.username has a value',
        message: 'custom message',
        result: false,
      },
      {
        actual: 'Element input.input.username has no value',
        expected: 'Element input.input.username has a value',
        message: 'custom message',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasAnyValue();

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasAnyValue()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasAnyValue()).toThrow('Unexpected Parameter: true');
    //@ts-ignore
    expect(() => assert.dom(undefined).hasAnyValue()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasAnyValue()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasAnyValue()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input value="foo"/>';

    assert
      .dom('input')
      .hasAnyValue()
      .hasAnyValue();

    expect(assert.results.length).toEqual(2);
  });
});
