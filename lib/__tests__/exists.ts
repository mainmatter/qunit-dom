/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).exists()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('selector only', () => {
    test('succeeds if element exists', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').exists();

      expect(assert.results).toEqual([{
        actual: 'Element h1 exists',
        expected: 'Element h1 exists',
        message: 'Element h1 exists',
        result: true,
      }]);
    });

    test('fails if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').exists();

      expect(assert.results).toEqual([{
        actual: 'Element h2 does not exist',
        expected: 'Element h2 exists',
        message: 'Element h2 exists',
        result: false,
      }]);
    });
  });

  describe('custom messages', () => {
    test('without options', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').exists('foo');

      expect(assert.results).toEqual([{
        actual: 'Element h1 exists',
        expected: 'Element h1 exists',
        message: 'foo',
        result: true,
      }]);
    });

    test('with options', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').exists({ count: 1 }, 'foo');

      expect(assert.results).toEqual([{
        actual: 'Element h1 exists once',
        expected: 'Element h1 exists once',
        message: 'foo',
        result: true,
      }]);
    });
  });

  describe('with count option', () => {
    test('succeeds if element exists N times', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('div').exists({ count: 3 });

      expect(assert.results).toEqual([{
        actual: 'Element div exists 3 times',
        expected: 'Element div exists 3 times',
        message: 'Element div exists 3 times',
        result: true,
      }]);
    });

    test('fails if element exists less than N times', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('div').exists({ count: 5 });

      expect(assert.results).toEqual([{
        actual: 'Element div exists 3 times',
        expected: 'Element div exists 5 times',
        message: 'Element div exists 5 times',
        result: false,
      }]);
    });

    test('fails if element exists more than N times', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('div').exists({ count: 2 });

      expect(assert.results).toEqual([{
        actual: 'Element div exists 3 times',
        expected: 'Element div exists twice',
        message: 'Element div exists twice',
        result: false,
      }]);
    });

    test('fails if element is missing', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('span').exists({ count: 3 });

      expect(assert.results).toEqual([{
        actual: 'Element span does not exist',
        expected: 'Element span exists 3 times',
        message: 'Element span exists 3 times',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(document.body).exists()).toThrow('Unexpected Parameter: [object HTMLBodyElement]');

    expect(() => assert.dom(5).exists()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).exists()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).exists()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).exists()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).exists()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
