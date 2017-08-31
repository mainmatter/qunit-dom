/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const exists = wrap(require('./exists'));

describe('selector only', () => {
  test('succeeds if element exists', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(exists('h1')).toEqual({
      actual: 'Element h1 exists',
      expected: 'Element h1 exists',
      message: 'Element h1 exists',
      result: true,
    });
  });

  test('fails if element is missing', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(exists('h2')).toEqual({
      actual: 'Element h2 does not exist',
      expected: 'Element h2 exists',
      message: 'Element h2 exists',
      result: false,
    });
  });
});

describe('custom messages', () => {
  test('without options', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(exists('h1', 'foo')).toEqual({
      actual: 'Element h1 exists',
      expected: 'Element h1 exists',
      message: 'foo',
      result: true,
    });
  });

  test('with options', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(exists('h1', { count: 1 }, 'foo')).toEqual({
      actual: 'Element h1 exists once',
      expected: 'Element h1 exists once',
      message: 'foo',
      result: true,
    });
  });
});

describe('with count option', () => {
  test('succeeds if element exists N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    expect(exists('div', { count: 3 })).toEqual({
      actual: 'Element div exists 3 times',
      expected: 'Element div exists 3 times',
      message: 'Element div exists 3 times',
      result: true,
    });
  });

  test('fails if element exists less than N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    expect(exists('div', { count: 5 })).toEqual({
      actual: 'Element div exists 3 times',
      expected: 'Element div exists 5 times',
      message: 'Element div exists 5 times',
      result: false,
    });
  });

  test('fails if element exists more than N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    expect(exists('div', { count: 2 })).toEqual({
      actual: 'Element div exists 3 times',
      expected: 'Element div exists twice',
      message: 'Element div exists twice',
      result: false,
    });
  });

  test('fails if element is missing', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    expect(exists('span', { count: 3 })).toEqual({
      actual: 'Element span does not exist',
      expected: 'Element span exists 3 times',
      message: 'Element span exists 3 times',
      result: false,
    });
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => exists(document.body)).toThrow('Unexpected Parameter: [object HTMLBodyElement]');

  expect(() => exists(5)).toThrow('Unexpected Parameter: 5');
  expect(() => exists(true)).toThrow('Unexpected Parameter: true');
  expect(() => exists(undefined)).toThrow('Unexpected Parameter: undefined');
  expect(() => exists({})).toThrow('Unexpected Parameter: [object Object]');
  expect(() => exists(document)).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
