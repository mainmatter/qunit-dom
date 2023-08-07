/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).containingText()...', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('with string', () => {
    test('passing', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert.dom('div').containingText('Second').matchesSelector('.b');
      expect(assert.results).toEqual([
        {
          actual: 'The element passed also matches the selector .b.',
          expected: 'The element passed also matches the selector .b.',
          message: 'The element passed also matches the selector .b.',
          result: true,
        },
      ]);
    });
    test('failing chained assertion', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert.dom('div').containingText('Second').matchesSelector('.a');
      expect(assert.results).toEqual([
        {
          actual: 'The element passed did not also match the selector .a.',
          expected: 'The element should have matched .a.',
          message: 'The element passed did not also match the selector .a.',
          result: false,
        },
      ]);
    });

    test('failing due to no match on initial selector', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert.dom('span').containingText('Second').exists();
      expect(assert.results).toEqual([
        {
          actual: 'Element span containing text Second does not exist',
          expected: 'Element span containing text Second exists',
          message: 'Element span containing text Second exists',
          result: false,
        },
      ]);
    });

    test('failing due to no match on our predicate', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert.dom('div').containingText('nowhere').exists();
      expect(assert.results).toEqual([
        {
          actual: 'Element div containing text nowhere does not exist',
          expected: 'Element div containing text nowhere exists',
          message: 'Element div containing text nowhere exists',
          result: false,
        },
      ]);
    });
  });

  describe('with regexp', () => {
    test('passing', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert
        .dom('div')
        .containingText(/S.cond/)
        .matchesSelector('.b');
      expect(assert.results).toEqual([
        {
          actual: 'The element passed also matches the selector .b.',
          expected: 'The element passed also matches the selector .b.',
          message: 'The element passed also matches the selector .b.',
          result: true,
        },
      ]);
    });
    test('failing', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert
        .dom('div')
        .containingText(/S.cond/)
        .matchesSelector('.a');
      expect(assert.results).toEqual([
        {
          actual: 'The element passed did not also match the selector .a.',
          expected: 'The element should have matched .a.',
          message: 'The element passed did not also match the selector .a.',
          result: false,
        },
      ]);
    });
    test('failing due to no match on initial selector', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert
        .dom('span')
        .containingText(/S.cond/)
        .exists();
      expect(assert.results).toEqual([
        {
          actual: 'Element span containing text /S.cond/ does not exist',
          expected: 'Element span containing text /S.cond/ exists',
          message: 'Element span containing text /S.cond/ exists',
          result: false,
        },
      ]);
    });

    test('failing due to no match on our predicate', () => {
      document.body.innerHTML =
        '<article><div class="a">\nFirst\n</div><div class="b">\nSecond\n</div></article>';

      assert
        .dom('div')
        .containingText(/nowhere/)
        .exists();
      expect(assert.results).toEqual([
        {
          actual: 'Element div containing text /nowhere/ does not exist',
          expected: 'Element div containing text /nowhere/ exists',
          message: 'Element div containing text /nowhere/ exists',
          result: false,
        },
      ]);
    });
  });

  describe('invalid arguments to `containingText`', () => {
    test('passing undefined to `containingText` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom('div').containingText().hasText(1234)).toThrow(
        'You must pass a string or Regular Expression to "containingText". You passed undefined'
      );
    });
  });
});
