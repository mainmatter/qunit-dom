/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasProperty()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password">';
  });

  describe('string expected', () => {
    test('succeeds for correct name and value', () => {
      assert.dom('input').hasProperty('type', 'password');
      assert.dom(document.querySelector('input')).hasProperty('type', 'password');

      expect(assert.results).toEqual([
        {
          actual: 'Element input has property "type" with value "password"',
          expected: 'Element input has property "type" with value "password"',
          message: 'Element input has property "type" with value "password"',
          result: true,
        },
        {
          actual: 'Element input[type="password"] has property "type" with value "password"',
          expected: 'Element input[type="password"] has property "type" with value "password"',
          message: 'Element input[type="password"] has property "type" with value "password"',
          result: true,
        },
      ]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasProperty('type', 'text');
      assert.dom(document.querySelector('input')).hasProperty('type', 'text');

      expect(assert.results).toEqual([
        {
          actual: 'Element input has property "type" with value "password"',
          expected: 'Element input has property "type" with value "text"',
          message: 'Element input has property "type" with value "text"',
          result: false,
        },
        {
          actual: 'Element input[type="password"] has property "type" with value "password"',
          expected: 'Element input[type="password"] has property "type" with value "text"',
          message: 'Element input[type="password"] has property "type" with value "text"',
          result: false,
        },
      ]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for matching name and value', () => {
      assert.dom('input').hasProperty('type', /^pass/);
      assert.dom(document.querySelector('input')).hasProperty('type', /^pass/);

      expect(assert.results).toEqual([
        {
          actual: 'Element input has property "type" with value "password"',
          expected: 'Element input has property "type" with value matching /^pass/',
          message: 'Element input has property "type" with value matching /^pass/',
          result: true,
        },
        {
          actual: 'Element input[type="password"] has property "type" with value "password"',
          expected:
            'Element input[type="password"] has property "type" with value matching /^pass/',
          message: 'Element input[type="password"] has property "type" with value matching /^pass/',
          result: true,
        },
      ]);
    });

    test('fails for wrong value', () => {
      assert.dom('input').hasProperty('type', /mail$/);
      assert.dom(document.querySelector('input')).hasProperty('type', /mail$/);

      expect(assert.results).toEqual([
        {
          actual: 'Element input has property "type" with value "password"',
          expected: 'Element input has property "type" with value matching /mail$/',
          message: 'Element input has property "type" with value matching /mail$/',
          result: false,
        },
        {
          actual: 'Element input[type="password"] has property "type" with value "password"',
          expected:
            'Element input[type="password"] has property "type" with value matching /mail$/',
          message: 'Element input[type="password"] has property "type" with value matching /mail$/',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasProperty('foo', 'bar');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasProperty('foo', 'bar')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasProperty('foo', 'bar')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasProperty('foo', 'bar')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).hasProperty('foo', 'bar')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).hasProperty('foo', 'bar')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').hasProperty('className', 'foo').hasProperty('tagName', 'BAR');

    expect(assert.results.length).toEqual(2);
  });
});
