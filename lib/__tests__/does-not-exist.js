/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotExist()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('selector only', () => {
    test('fails if element exists', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h1').doesNotExist();

      expect(assert.results).toEqual([{
        actual: 'Element h1 exists once',
        expected: 'Element h1 does not exist',
        message: 'Element h1 does not exist',
        result: false,
      }]);
    });

    test('fails if element exists multiple times', () => {
      document.body.innerHTML = '<div></div>'.repeat(3);

      assert.dom('div').doesNotExist();

      expect(assert.results).toEqual([{
        actual: 'Element div exists 3 times',
        expected: 'Element div does not exist',
        message: 'Element div does not exist',
        result: false,
      }]);
    });

    test('succeeds if element is missing', () => {
      document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

      assert.dom('h2').doesNotExist();

      expect(assert.results).toEqual([{
        actual: 'Element h2 does not exist',
        expected: 'Element h2 does not exist',
        message: 'Element h2 does not exist',
        result: true,
      }]);
    });
  });

  test('custom message', () => {
    document.body.innerHTML = '<h1 class="baz">foo</h1>bar';

    assert.dom('h2').doesNotExist('foo');

    expect(assert.results).toEqual([{
      actual: 'Element h2 does not exist',
      expected: 'Element h2 does not exist',
      message: 'foo',
      result: true,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(document.body).doesNotExist()).toThrow('Unexpected Parameter: [object HTMLBodyElement]');

    expect(() => assert.dom(5).doesNotExist()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotExist()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotExist()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).doesNotExist()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).doesNotExist()).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
