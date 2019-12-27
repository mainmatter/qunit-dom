/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotHaveClass()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password" class="secret-password-input foo">';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input[type="password"]').doesNotHaveClass('username-input');
      assert
        .dom(document.querySelector('input[type="password"]'))
        .doesNotHaveClass('username-input');

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'not: username-input',
          message: 'Element input[type="password"] does not have CSS class "username-input"',
          result: true,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'not: username-input',
          message:
            'Element input.secret-password-input.foo[type="password"] does not have CSS class "username-input"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('input[type="password"]').doesNotHaveClass('secret-password-input');
      assert
        .dom(document.querySelector('input[type="password"]'))
        .doesNotHaveClass('secret-password-input');

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'not: secret-password-input',
          message: 'Element input[type="password"] does not have CSS class "secret-password-input"',
          result: false,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'not: secret-password-input',
          message:
            'Element input.secret-password-input.foo[type="password"] does not have CSS class "secret-password-input"',
          result: false,
        },
      ]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('input[type="password"]').doesNotHaveClass(/public-password.*/);
      assert
        .dom(document.querySelector('input[type="password"]'))
        .doesNotHaveClass(/public-password.*/);

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'not: /public-password.*/',
          message:
            'Element input[type="password"] does not have CSS class matching /public-password.*/',
          result: true,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'not: /public-password.*/',
          message:
            'Element input.secret-password-input.foo[type="password"] does not have CSS class matching /public-password.*/',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('input[type="password"]').doesNotHaveClass(/.*password/);
      assert.dom(document.querySelector('input[type="password"]')).doesNotHaveClass(/.*password/);

      expect(assert.results).toEqual([
        {
          actual: 'secret-password-input foo',
          expected: 'not: /.*password/',
          message: 'Element input[type="password"] does not have CSS class matching /.*password/',
          result: false,
        },
        {
          actual: 'secret-password-input foo',
          expected: 'not: /.*password/',
          message:
            'Element input.secret-password-input.foo[type="password"] does not have CSS class matching /.*password/',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotHaveClass('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotHaveClass('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).doesNotHaveClass('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).doesNotHaveClass('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
