import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNot()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<h1 id="title">Title</h1>\n<h2 id="subtitle">Subtitle</h2>\n';
  });

  test('with custom message', () => {
    assert.dom('#title').isNot(document.querySelector('#subtitle'), 'custom message');

    expect(assert.results).toEqual([
      {
        actual: 'h1#title',
        expected: 'not: h2#subtitle',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: Element;

    beforeEach(() => {
      element = document.querySelector('#title');
    });

    test('succeeds for a different element', () => {
      assert.dom(element).isNot(document.querySelector('#subtitle'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'not: h2#subtitle',
          message: 'Element h1#title is not the same element as h2#subtitle',
          result: true,
        },
      ]);
    });

    test('fails for the same element', () => {
      assert.dom(element).isNot(element);

      expect(assert.results).toEqual([
        {
          actual: 'h1#title (the same element)',
          expected: 'not: h1#title',
          message: 'Element h1#title is not the same element as h1#title',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNot(element);

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    test('succeeds for a different element', () => {
      assert.dom('#title').isNot(document.querySelector('#subtitle'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'not: h2#subtitle',
          message: 'Element #title is not the same element as h2#subtitle',
          result: true,
        },
      ]);
    });

    test('fails for the same element', () => {
      assert.dom('#title').isNot(document.querySelector('#title'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title (the same element)',
          expected: 'not: h1#title',
          message: 'Element #title is not the same element as h1#title',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('#missing').isNot(document.querySelector('#title'));

      expect(assert.results).toEqual([
        {
          message: 'Element #missing should exist',
          result: false,
        },
      ]);
    });
  });

  describe('invalid arguments to `isNot`', () => {
    let element: Element;

    beforeEach(() => {
      element = document.querySelector('#title');
    });

    test('passing null to `isNot` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).isNot(null)).toThrow(
        'You must pass an Element to "isNot". You passed null'
      );
    });

    test('passing a selector to `isNot` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).isNot('#subtitle')).toThrow(
        'You must pass an Element to "isNot". You passed #subtitle'
      );
    });
  });

  test('supports chaining', () => {
    let element = document.querySelector('#subtitle');

    assert.dom('#title').isNot(element).isNot(element);

    expect(assert.results.length).toEqual(2);
  });
});
