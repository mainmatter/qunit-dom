/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasClass()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password" class="secret-password-input foo">';
  });

  test('succeeds for correct content', () => {
    assert.dom('input[type="password"]').hasClass('secret-password-input');
    assert.dom(document.querySelector('input[type="password"]')).hasClass('secret-password-input');

    expect(assert.results).toEqual([{
      actual: 'secret-password-input foo',
      expected: 'secret-password-input',
      message: 'Element input[type="password"] has CSS class "secret-password-input"',
      result: true,
    }, {
      actual: 'secret-password-input foo',
      expected: 'secret-password-input',
      message: 'Element input.secret-password-input.foo[type="password"] has CSS class "secret-password-input"',
      result: true,
    }]);
  });

  test('fails for wrong content', () => {
    assert.dom('input[type="password"]').hasClass('username-input');
    assert.dom(document.querySelector('input[type="password"]')).hasClass('username-input');

    expect(assert.results).toEqual([{
      actual: 'secret-password-input foo',
      expected: 'username-input',
      message: 'Element input[type="password"] has CSS class "username-input"',
      result: false,
    }, {
      actual: 'secret-password-input foo',
      expected: 'username-input',
      message: 'Element input.secret-password-input.foo[type="password"] has CSS class "username-input"',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasClass('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasClass('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasClass('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasClass('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasClass('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasClass('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
