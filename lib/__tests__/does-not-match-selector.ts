/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotMatchSelector()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';
  });

  describe('success scenarios', () => {
    test('one element not matching compareSelector', () => {

      assert.dom('p.first').doesNotMatchSelector('p + p');

      expect(assert.results).toEqual([{
        actual: 0,
        expected: 0,
        message: 'The element selected by p.first did not also match the selector p + p.',
        result: true
      }]);
    });

    test('multiple elements all not matching compareSelector', () => {

      assert.dom('p + p').doesNotMatchSelector('div>p.first');

      expect(assert.results).toEqual([{
        actual: 0,
        expected: 0,
        message: '2 elements, selected by p + p, did not also match the selector div>p.first.',
        result: true
      }]);
    });
  });

  describe('failure scenarios', () => {
    test('one element matching compareSelector', () => {

      assert.dom('p.last').doesNotMatchSelector('div>p:nth-child(3)');

      expect(assert.results).toEqual([{
        actual: 1,
        expected: 0,
        message: 'The element selected by p.last did also match the selector div>p:nth-child(3).',
        result: false
      }]);
    });

    test('multiple elements, some matching compareSelector', () => {

      assert.dom('p').doesNotMatchSelector('div>p');

      expect(assert.results).toEqual([{
        actual: 3,
        expected: 0,
        message: '3 elements out of 3, selected by p, did also match the selector div>p.',
        result: false
      }]);
    });
  })
});
