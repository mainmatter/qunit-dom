/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).matchesSelector()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('matchesSelector: success scenarios', () => {
    test('succeeds for one element matching the selector', () => {
      document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';

      assert.dom('p.last').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([{
        actual: 1,
        expected: 1,
        message: 'The element selected by p.last also matches the selector div>p:last-child.',
        result: true,
      }]);
    });

    test('succeeds for multiple elements, all sucessfully matched', () => {
      document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>.';

      assert.dom('p').matchesSelector('div>p');

      expect(assert.results).toEqual([{
        actual: 3,
        expected: 3,
        message: '3 elements, selected by p, also match the selector div>p.',
        result: true,
      }]);
    });
  });

  describe('matchesSelector: failing assertions', () => {
    test('fails for one element not matching compareSelector', () => {
      document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';

      assert.dom('p.first').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([{
        actual: 0,
        expected: 1,
        message: 'The element selected by p.first did not also match the selector div>p:last-child.',
        result: false,
      }]);
    });

    test('fails for multiple element not all matching compareSelector', () => {
      document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';

      assert.dom('p').matchesSelector('p + p');

      expect(assert.results).toEqual([{
        actual: 2,
        expected: 3,
        message: '2 out of 3 elements selected by p did not also match the selector p + p.',
        result: false,
      }]);
    })
  })


});
