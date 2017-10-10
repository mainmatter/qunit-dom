/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).doesNotHaveClass()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password" class="secret-password-input foo">';
  });

  test('succeeds for correct content', () => {
    assert.dom('input[type="password"]').doesNotHaveClass('username-input');
    assert.dom(document.querySelector('input[type="password"]')).doesNotHaveClass('username-input');

    expect(assert.results).toEqual([{
      actual: 'secret-password-input foo',
      expected: 'not: username-input',
      message: 'Element input[type="password"] does not have CSS class "username-input"',
      result: true,
    }, {
      actual: 'secret-password-input foo',
      expected: 'not: username-input',
      message: 'Element input.secret-password-input.foo[type="password"] does not have CSS class "username-input"',
      result: true,
    }]);
  });

  test('fails for wrong content', () => {
    assert.dom('input[type="password"]').doesNotHaveClass('secret-password-input');
    assert.dom(document.querySelector('input[type="password"]')).doesNotHaveClass('secret-password-input');

    expect(assert.results).toEqual([{
      actual: 'secret-password-input foo',
      expected: 'not: secret-password-input',
      message: 'Element input[type="password"] does not have CSS class "secret-password-input"',
      result: false,
    }, {
      actual: 'secret-password-input foo',
      expected: 'not: secret-password-input',
      message: 'Element input.secret-password-input.foo[type="password"] does not have CSS class "secret-password-input"',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotHaveClass('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).doesNotHaveClass('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
