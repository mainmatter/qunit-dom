/* eslint-env jest */

const wrap = require('../helpers/wrap-for-testing');
const textContains = wrap(require('./text-contains'));

describe('with HTMLElement', () => {
  let element;

  beforeEach(() => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
    element = document.querySelector('h1');
  });

  test('succeeds for correct content', () => {
    expect(textContains(element, 'foo')).toEqual({
      actual: 'foo',
      expected: 'foo',
      message: 'Element h1.baz contains "foo"',
      result: true,
    });
  });

  test('succeeds for correct partial content', () => {
    expect(textContains(element, 'oo')).toEqual({
      actual: 'foo',
      expected: 'oo',
      message: 'Element h1.baz contains "oo"',
      result: true,
    });
  });

  test('fails for wrong content', () => {
    expect(textContains(element, 'bar')).toEqual({
      actual: 'foo',
      expected: 'bar',
      message: 'Element h1.baz contains "bar"',
      result: false,
    });
  });
});

describe('with selector', () => {
  beforeEach(() => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';
  });

  test('succeeds for correct content', () => {
    expect(textContains('h1', 'foo')).toEqual({
      actual: 'foo',
      expected: 'foo',
      message: 'Element h1 contains "foo"',
      result: true,
    });
  });

  test('succeeds for correct partial content', () => {
    expect(textContains('h1', 'oo')).toEqual({
      actual: 'foo',
      expected: 'oo',
      message: 'Element h1 contains "oo"',
      result: true,
    });
  });

  test('fails for wrong content', () => {
    expect(textContains('h1', 'bar')).toEqual({
      actual: 'foo',
      expected: 'bar',
      message: 'Element h1 contains "bar"',
      result: false,
    });
  });
});
