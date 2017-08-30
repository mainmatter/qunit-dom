/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const textMatches = wrap(require('./text-matches'));

test('with custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(textMatches('h1', /fo+/, 'bar')).toEqual({
    actual: 'foo',
    expected: /fo+/,
    message: 'bar',
    result: true,
  });
});

describe('with HTMLElement', () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    element = document.querySelector('h1');
  });

  test('succeeds for correct content', () => {
    expect(textMatches(element, /fo+/)).toEqual({
      actual: 'foo',
      expected: /fo+/,
      message: 'Element h1.baz matches /fo+/',
      result: true,
    });
  });

  test('succeeds for correct partial content', () => {
    expect(textMatches(element, /oo/)).toEqual({
      actual: 'foo',
      expected: /oo/,
      message: 'Element h1.baz matches /oo/',
      result: true,
    });
  });

  test('fails for wrong content', () => {
    expect(textMatches(element, /bar/)).toEqual({
      actual: 'foo',
      expected: /bar/,
      message: 'Element h1.baz matches /bar/',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(textMatches(null, /fo+/)).toEqual({
      message: 'Element <unknown> exists',
      result: false,
    });
  });
});

describe('with selector', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
  });

  test('succeeds for correct content', () => {
    expect(textMatches('h1', /fo+/)).toEqual({
      actual: 'foo',
      expected: /fo+/,
      message: 'Element h1 matches /fo+/',
      result: true,
    });
  });

  test('succeeds for correct partial content', () => {
    expect(textMatches('h1', /oo/)).toEqual({
      actual: 'foo',
      expected: /oo/,
      message: 'Element h1 matches /oo/',
      result: true,
    });
  });

  test('fails for wrong content', () => {
    expect(textMatches('h1', /bar/)).toEqual({
      actual: 'foo',
      expected: /bar/,
      message: 'Element h1 matches /bar/',
      result: false,
    });
  });

  test('fails for missing element', () => {
    expect(textMatches('h2', /fo+/)).toEqual({
      message: 'Element h2 exists',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => textMatches(5, /fo+/)).toThrow('Unexpected Parameter: 5');
  expect(() => textMatches(true, /fo+/)).toThrow('Unexpected Parameter: true');
  expect(() => textMatches(undefined, /fo+/)).toThrow('Unexpected Parameter: undefined');
  expect(() => textMatches({}, /fo+/)).toThrow('Unexpected Parameter: [object Object]');
  expect(() => textMatches(document, /fo+/)).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
