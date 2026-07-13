import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).is()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<h1 id="title">Title</h1>\n<h2 id="subtitle">Subtitle</h2>\n';
  });

  test('with custom message', () => {
    let element = document.querySelector('#title');

    assert.dom('#title').is(element, 'custom message');

    expect(assert.results).toEqual([
      {
        actual: 'h1#title',
        expected: 'h1#title',
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

    test('succeeds for the same element', () => {
      assert.dom(element).is(element);

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'h1#title',
          message: 'Element h1#title is the same element as h1#title',
          result: true,
        },
      ]);
    });

    test('fails for a different element', () => {
      assert.dom(element).is(document.querySelector('#subtitle'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'h2#subtitle',
          message: 'Element h1#title is the same element as h2#subtitle',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).is(element);

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    test('succeeds for the same element', () => {
      assert.dom('#title').is(document.querySelector('#title'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'h1#title',
          message: 'Element #title is the same element as h1#title',
          result: true,
        },
      ]);
    });

    test('fails for a different element', () => {
      assert.dom('#title').is(document.querySelector('#subtitle'));

      expect(assert.results).toEqual([
        {
          actual: 'h1#title',
          expected: 'h2#subtitle',
          message: 'Element #title is the same element as h2#subtitle',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('#missing').is(document.querySelector('#title'));

      expect(assert.results).toEqual([
        {
          message: 'Element #missing should exist',
          result: false,
        },
      ]);
    });
  });

  test('fails for a different element with the same description', () => {
    document.body.innerHTML = '<div class="foo"></div><div class="foo"></div>';

    let [first, second] = document.querySelectorAll('.foo');

    assert.dom(first).is(second);

    expect(assert.results).toEqual([
      {
        actual: 'div.foo (a different element with the same description)',
        expected: 'div.foo',
        message: 'Element div.foo is the same element as div.foo',
        result: false,
      },
    ]);
  });

  describe('invalid arguments to `is`', () => {
    let element: Element;

    beforeEach(() => {
      element = document.querySelector('#title');
    });

    test('passing null to `is` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).is(null)).toThrow(
        'You must pass an Element to "is". You passed null'
      );
    });

    test('passing a selector to `is` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).is('#title')).toThrow(
        'You must pass an Element to "is". You passed #title'
      );
    });

    test('passing an object to `is` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).is({})).toThrow(
        'You must pass an Element to "is". You passed [object Object]'
      );
    });
  });

  test('supports chaining', () => {
    let element = document.querySelector('#title');

    assert.dom('#title').is(element).is(element);

    expect(assert.results.length).toEqual(2);
  });
});
