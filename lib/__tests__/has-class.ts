/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasClass()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password" class="secret-password-input foo">';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input[type="password"]').hasClass('secret-password-input');
      assert
        .dom(document.querySelector('input[type="password"]'))
        .hasClass('secret-password-input');

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'secret-password-input',
          message: 'Element input[type="password"] has CSS class "secret-password-input"',
          result: true,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'secret-password-input',
          message:
            'Element input.secret-password-input.foo[type="password"] has CSS class "secret-password-input"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('input[type="password"]').hasClass('username-input');
      assert.dom(document.querySelector('input[type="password"]')).hasClass('username-input');

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'username-input',
          message: 'Element input[type="password"] has CSS class "username-input"',
          result: false,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'username-input',
          message:
            'Element input.secret-password-input.foo[type="password"] has CSS class "username-input"',
          result: false,
        },
      ]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input[type="password"]').hasClass(/.*password/);
      assert.dom(document.querySelector('input[type="password"]')).hasClass(/.*password/);

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: /.*password/,
          message: 'Element input[type="password"] has CSS class matching /.*password/',
          result: true,
        },
        {
          actual: 'secret-password-input foo',
          expected: /.*password/,
          message:
            'Element input.secret-password-input.foo[type="password"] has CSS class matching /.*password/',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('input[type="password"]').hasClass(/public-password.*/);
      assert.dom(document.querySelector('input[type="password"]')).hasClass(/public-password.*/);

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: /public-password.*/,
          message: 'Element input[type="password"] has CSS class matching /public-password.*/',
          result: false,
        },
        {
          actual: 'secret-password-input foo',
          expected: /public-password.*/,
          message:
            'Element input.secret-password-input.foo[type="password"] has CSS class matching /public-password.*/',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasClass('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasClass('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasClass('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasClass('foo')).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasClass('foo')).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasClass('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
