/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const notFocused = wrap(require('./not-focused'));

test('with custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(notFocused('h1', 'foo')).toEqual({
    message: 'foo',
    result: true,
  });
});

describe('with HTMLElement', () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = 'foo<input type="email">bar';
    element = document.querySelector('input');
  });

  test('succeeds if element is not focused', () => {
    document.body.focus();

    expect(notFocused(element)).toEqual({
      message: 'Element input[type="email"] is not focused',
      result: true,
    });
  });

  test('fails if element is focused', () => {
    element.focus();

    expect(notFocused(element)).toEqual({
      message: 'Element input[type="email"] is not focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(notFocused(null)).toEqual({
      message: 'Element <unknown> exists',
      result: false,
    });
  });
});

describe('with selector', () => {
  beforeEach(() => {
    document.body.innerHTML = 'foo<input type="email">bar';
  });

  test('succeeds if element is not focused', () => {
    document.body.focus();

    expect(notFocused('input')).toEqual({
      message: 'Element input is not focused',
      result: true,
    });
  });

  test('fails if element is focused', () => {
    document.querySelector('input').focus();

    expect(notFocused('input')).toEqual({
      message: 'Element input is not focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(notFocused('input[type="password"]')).toEqual({
      message: 'Element input[type="password"] exists',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => notFocused(5, 'foo')).toThrow('Unexpected Parameter: 5');
  expect(() => notFocused(true, 'foo')).toThrow('Unexpected Parameter: true');
  expect(() => notFocused(undefined, 'foo')).toThrow('Unexpected Parameter: undefined');
  expect(() => notFocused({}, 'foo')).toThrow('Unexpected Parameter: [object Object]');
  expect(() => notFocused(document, 'foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
