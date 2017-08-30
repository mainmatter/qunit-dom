/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const isNotFocused = wrap(require('./is-not-focused'));

test('with custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(isNotFocused('h1', 'foo')).toEqual({
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

    expect(isNotFocused(element)).toEqual({
      message: 'Element input[type="email"] is not focused',
      result: true,
    });
  });

  test('fails if element is focused', () => {
    element.focus();

    expect(isNotFocused(element)).toEqual({
      message: 'Element input[type="email"] is not focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(isNotFocused(null)).toEqual({
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

    expect(isNotFocused('input')).toEqual({
      message: 'Element input is not focused',
      result: true,
    });
  });

  test('fails if element is focused', () => {
    document.querySelector('input').focus();

    expect(isNotFocused('input')).toEqual({
      message: 'Element input is not focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(isNotFocused('input[type="password"]')).toEqual({
      message: 'Element input[type="password"] exists',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => isNotFocused(5, 'foo')).toThrow('Unexpected Parameter: 5');
  expect(() => isNotFocused(true, 'foo')).toThrow('Unexpected Parameter: true');
  expect(() => isNotFocused(undefined, 'foo')).toThrow('Unexpected Parameter: undefined');
  expect(() => isNotFocused({}, 'foo')).toThrow('Unexpected Parameter: [object Object]');
  expect(() => isNotFocused(document, 'foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
