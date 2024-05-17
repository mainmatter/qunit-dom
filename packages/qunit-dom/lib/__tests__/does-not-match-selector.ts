import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotMatchSelector()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div><p class="first"></p><p></p><p class="last"></p></div>';
  });

  describe('success scenarios', () => {
    test('one element (selector passed) not matching compareSelector', () => {
      assert.dom('p.first').doesNotMatchSelector('p + p');

      expect(assert.results).toEqual([
        {
          actual: 'The element selected by p.first did not also match the selector p + p.',
          expected: 'The element selected by p.first did not also match the selector p + p.',
          message: 'The element selected by p.first did not also match the selector p + p.',
          result: true,
        },
      ]);
    });

    test('one element (element passed) not matching compareSelector', () => {
      let element = document.querySelector('p.first');
      assert.dom(element).doesNotMatchSelector('p + p');

      expect(assert.results).toEqual([
        {
          actual: 'The element passed did not also match the selector p + p.',
          expected: 'The element passed did not also match the selector p + p.',
          message: 'The element passed did not also match the selector p + p.',
          result: true,
        },
      ]);
    });

    test('multiple elements all not matching compareSelector', () => {
      assert.dom('p + p').doesNotMatchSelector('div>p.first');

      expect(assert.results).toEqual([
        {
          actual: '2 elements, selected by p + p, did not also match the selector div>p.first.',
          expected: '2 elements, selected by p + p, did not also match the selector div>p.first.',
          message: '2 elements, selected by p + p, did not also match the selector div>p.first.',
          result: true,
        },
      ]);
    });
  });

  describe('failure scenarios', () => {
    test('one element (selector passed) matching compareSelector', () => {
      assert.dom('p.last').doesNotMatchSelector('div>p:nth-child(3)');

      expect(assert.results).toEqual([
        {
          actual: 'The element selected by p.last matched div>p:nth-child(3).',
          expected:
            'The element selected by p.last must not also match the selector div>p:nth-child(3).',
          message:
            'The element selected by p.last must not also match the selector div>p:nth-child(3).',
          result: false,
        },
      ]);
    });

    test('one element (element passed) matching compareSelector', () => {
      let element = document.querySelector('p.last');
      assert.dom(element).doesNotMatchSelector('div>p:nth-child(3)');

      expect(assert.results).toEqual([
        {
          actual: 'The element passed matched div>p:nth-child(3).',
          expected: 'The element passed must not also match the selector div>p:nth-child(3).',
          message: 'The element passed must not also match the selector div>p:nth-child(3).',
          result: false,
        },
      ]);
    });

    test('null passed', () => {
      assert.dom(null).doesNotMatchSelector('div>p:last-child');

      expect(assert.results).toEqual([
        {
          actual: '0 elements, selected by null, did not also match the selector div>p:last-child.',
          expected:
            '0 elements, selected by null, did not also match the selector div>p:last-child.',
          message:
            '0 elements, selected by null, did not also match the selector div>p:last-child.',
          result: true,
        },
      ]);
    });

    test('multiple elements, some matching compareSelector', () => {
      assert.dom('p').doesNotMatchSelector('div>p');

      expect(assert.results).toEqual([
        {
          actual: '0 elements did not match div>p.',
          expected: '3 elements should not have matched div>p.',
          message: '3 elements out of 3, selected by p, must not also match the selector div>p.',
          result: false,
        },
      ]);
    });
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').doesNotMatchSelector('.foo').doesNotMatchSelector('.bar');

    expect(assert.results.length).toEqual(2);
  });
});
