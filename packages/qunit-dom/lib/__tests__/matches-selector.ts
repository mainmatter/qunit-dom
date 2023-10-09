import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).matchesSelector()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';
  });

  describe('success scenarios', () => {
    test('succeeds for one element (selector passed) matching the selector', () => {
      assert.dom('p.last').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([
        {
          actual: 'The element selected by p.last also matches the selector div>p:last-child.',
          expected: 'The element selected by p.last also matches the selector div>p:last-child.',
          message: 'The element selected by p.last also matches the selector div>p:last-child.',
          result: true,
        },
      ]);
    });

    test('succeeds for one element (element passed) matching compareSelector', () => {
      const element = document.querySelector('p.last');
      assert.dom(element).matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([
        {
          actual: 'The element passed also matches the selector div>p:last-child.',
          expected: 'The element passed also matches the selector div>p:last-child.',
          message: 'The element passed also matches the selector div>p:last-child.',
          result: true,
        },
      ]);
    });

    test('succeeds for multiple elements, all sucessfully matched', () => {
      assert.dom('p').matchesSelector('div>p');

      expect(assert.results).toEqual([
        {
          actual: '3 elements, selected by p, also match the selector div>p.',
          expected: '3 elements, selected by p, also match the selector div>p.',
          message: '3 elements, selected by p, also match the selector div>p.',
          result: true,
        },
      ]);
    });
  });

  describe('failure scenarios', () => {
    test('one element (selector passed) not matching compareSelector', () => {
      assert.dom('p.first').matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([
        {
          actual:
            'The element selected by p.first did not also match the selector div>p:last-child.',
          expected: 'The element should have matched div>p:last-child.',
          message:
            'The element selected by p.first did not also match the selector div>p:last-child.',
          result: false,
        },
      ]);
    });

    test('one element (element passed) not matching compareSelector', () => {
      const element = document.querySelector('p.first');
      assert.dom(element).matchesSelector('div>p:last-child');

      expect(assert.results).toEqual([
        {
          actual: 'The element passed did not also match the selector div>p:last-child.',
          expected: 'The element should have matched div>p:last-child.',
          message: 'The element passed did not also match the selector div>p:last-child.',
          result: false,
        },
      ]);
    });

    test('multiple elements not all matching compareSelector', () => {
      assert.dom('p').matchesSelector('p + p');

      expect(assert.results).toEqual([
        {
          actual: '2 elements matched p + p.',
          expected: '3 elements should have matched p + p.',
          message: '1 out of 3 elements selected by p did not also match the selector p + p.',
          result: false,
        },
      ]);
    });
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').matchesSelector('.foo').matchesSelector('.bar');

    expect(assert.results.length).toEqual(2);
  });
});
