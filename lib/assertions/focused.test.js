/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const focused = wrap(require('./focused'));

test('with custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(focused('h1', 'foo')).toEqual({
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

    expect(focused(element)).toEqual({
      actual: 'input[type="email"]',
      expected: 'input[type="email"]',
      message: 'Element input[type="email"] is focused',
      result: true,
    });
  });

  test('fails if element is not focused', () => {
    document.body.focus();

    expect(focused(element)).toEqual({
      actual: 'body',
      expected: 'input[type="email"]',
      message: 'Element input[type="email"] is focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(focused(null)).toEqual({
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

    expect(focused('input')).toEqual({
      actual: 'input[type="email"]',
      expected: 'input',
      message: 'Element input is focused',
      result: true,
    });
  });

  test('fails if element is not focused', () => {
    document.body.focus();

    expect(focused('input')).toEqual({
      actual: 'body',
      expected: 'input',
      message: 'Element input is focused',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(focused('input[type="password"]')).toEqual({
      message: 'Element input[type="password"] exists',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => focused(5, 'foo')).toThrow('Unexpected Parameter: 5');
  expect(() => focused(true, 'foo')).toThrow('Unexpected Parameter: true');
  expect(() => focused(undefined, 'foo')).toThrow('Unexpected Parameter: undefined');
  expect(() => focused({}, 'foo')).toThrow('Unexpected Parameter: [object Object]');
  expect(() => focused(document, 'foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
