import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasCount()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('succeeds if element exists N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    assert.dom('div').hasCount(3);

    expect(assert.results).toEqual([
      {
        actual: 'Element div exists 3 times',
        expected: 'Element div exists 3 times',
        message: 'Element div exists 3 times',
        result: true,
      },
    ]);
  });

  test('fails if element exists less than N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    assert.dom('div').hasCount(5);

    expect(assert.results).toEqual([
      {
        actual: 'Element div exists 3 times',
        expected: 'Element div exists 5 times',
        message: 'Element div exists 5 times',
        result: false,
      },
    ]);
  });

  test('fails if element exists more than N times', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    assert.dom('div').hasCount(2);

    expect(assert.results).toEqual([
      {
        actual: 'Element div exists 3 times',
        expected: 'Element div exists twice',
        message: 'Element div exists twice',
        result: false,
      },
    ]);
  });

  test('fails if element is missing', () => {
    document.body.innerHTML = '<div></div>'.repeat(3);

    assert.dom('span').hasCount(3);

    expect(assert.results).toEqual([
      {
        actual: 'Element span does not exist',
        expected: 'Element span exists 3 times',
        message: 'Element span exists 3 times',
        result: false,
      },
    ]);
  });
});
