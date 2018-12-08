/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).matchesSelector()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';
  });

  describe('success scenarios', () => {
    test('succeeds for one element matching the selector', () => {

      assert.dom('p.last').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([{
        actual: 1,
        expected: 1,
        message: 'The element selected by p.last also matches the selector div>p:last-child.',
        result: true
      }]);
    });

    test('succeeds for multiple elements, all sucessfully matched', () => {

      assert.dom('p').matchesSelector('div>p');

      expect(assert.results).toEqual([{
        actual: 3,
        expected: 3,
        message: '3 elements, selected by p, also match the selector div>p.',
        result: true
      }]);
    });
  });

  describe('failure scenarios', () => {
    test('one element not matching compareSelector', () => {

      assert.dom('p.first').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([{
        actual: 0,
        expected: 1,
        message: 'The element selected by p.first did not also match the selector div>p:last-child.',
        result: false
      }]);
    });

    test('multiple elements not all matching compareSelector', () => {

      assert.dom('p').matchesSelector('p + p');

      expect(assert.results).toEqual([{
        actual: 2,
        expected: 3,
        message: '1 out of 3 elements selected by p did not also match the selector p + p.',
        result: false
      }]);
    });
  })
});
