/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const missing = wrap(require('./missing'));

describe('selector only', () => {
  test('fails if element exists', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(missing('h1')).toEqual({
      actual: 'Element h1 exists once',
      expected: 'Element h1 does not exist',
      message: 'Element h1 does not exist',
      result: false,
    });
  });

  test('fails if element exists multiple times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    expect(missing('div')).toEqual({
      actual: 'Element div exists 3 times',
      expected: 'Element div does not exist',
      message: 'Element div does not exist',
      result: false,
    });
  });

  test('succeeds if element is missing', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    expect(missing('h2')).toEqual({
      actual: 'Element h2 does not exist',
      expected: 'Element h2 does not exist',
      message: 'Element h2 does not exist',
      result: true,
    });
  });
});

test('custom message', () => {
  document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

  expect(missing('h2', 'foo')).toEqual({
    actual: 'Element h2 does not exist',
    expected: 'Element h2 does not exist',
    message: 'foo',
    result: true,
  });
});

test('throws for unexpected parameter types', () => {
  expect(() => missing(document.body)).toThrow('Unexpected Parameter: [object HTMLBodyElement]');

  expect(() => missing(5)).toThrow('Unexpected Parameter: 5');
  expect(() => missing(true)).toThrow('Unexpected Parameter: true');
  expect(() => missing(undefined)).toThrow('Unexpected Parameter: undefined');
  expect(() => missing({})).toThrow('Unexpected Parameter: [object Object]');
  expect(() => missing(document)).toThrow('Unexpected Parameter: [object HTMLDocument]');
});
