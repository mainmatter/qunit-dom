/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const isFocused = wrap(require('./is-focused'));

test('with custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(isFocused('h1', 'foo')).toEqual({
    actual: 'body',
    expected: 'h1',
    message: 'foo',
    result: false,
  });
});

describe('with HTMLElement', () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = 'foo<input type="email">bar';
    element = document.querySelector('input');
  });

  test('succeeds if element is focused', () => {
    element.focus();

    expect(isFocused(element)).toEqual({
      actual: 'input[type="email"]',
      expected: 'input[type="email"]',
      message: 'Element input[type="email"] is focused',
      result: true,
    });
  });

  test('fails if element is not focused', () => {
    document.body.focus();

    expect(isFocused(element)).toEqual({
      actual: 'body',
      expected: 'input[type="email"]',
      message: 'Element input[type="email"] is focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(isFocused(null)).toEqual({
      message: 'Element <unknown> exists',
      result: false,
    });
  });
});

describe('with selector', () => {
  beforeEach(() => {
    document.body.innerHTML = 'foo<input type="email">bar';
  });

  test('succeeds if element is focused', () => {
    document.querySelector('input').focus();

    expect(isFocused('input')).toEqual({
      actual: 'input[type="email"]',
      expected: 'input',
      message: 'Element input is focused',
      result: true,
    });
  });

  test('fails if element is not focused', () => {
    document.body.focus();

    expect(isFocused('input')).toEqual({
      actual: 'body',
      expected: 'input',
      message: 'Element input is focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(isFocused('input[type="password"]')).toEqual({
      message: 'Element input[type="password"] exists',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => isFocused(5, 'foo')).toThrow('Unexpected Parameter: 5');
  expect(() => isFocused(true, 'foo')).toThrow('Unexpected Parameter: true');
  expect(() => isFocused(undefined, 'foo')).toThrow('Unexpected Parameter: undefined');
  expect(() => isFocused({}, 'foo')).toThrow('Unexpected Parameter: [object Object]');
  expect(() => isFocused(document, 'foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
