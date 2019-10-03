/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasTag()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 id="title">Title</h1>\n';

    assert.dom('#title').hasTag('h1', 'custom message');

    expect(assert.results).toEqual([
      {
        actual: 'h1',
        expected: 'h1',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 id="title">Title</h1>\n';
      element = document.querySelector('#title');
    });

    test('succeeds for correct tagName', () => {
      assert.dom(element).hasTag('h1');

      expect(assert.results).toEqual([
        {
          actual: 'h1',
          expected: 'h1',
          message: 'Element h1#title has tagName h1',
          result: true,
        },
      ]);
    });

    test('fails for wrong tagName', () => {
      assert.dom(element).hasTag('h2');

      expect(assert.results).toEqual([
        {
          actual: 'h1',
          expected: 'h2',
          message: 'Element h1#title does not have tagName h2',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).hasTag('h1');

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1 id="title">Title</h1>\n';
    });

    test('succeeds for correct tagName', () => {
      assert.dom('#title').hasTag('h1');

      expect(assert.results).toEqual([
        {
          actual: 'h1',
          expected: 'h1',
          message: 'Element #title has tagName h1',
          result: true,
        },
      ]);
    });

    test('fails for wrong tagName', () => {
      assert.dom('#title').hasTag('h2');

      expect(assert.results).toEqual([
        {
          actual: 'h1',
          expected: 'h2',
          message: 'Element #title does not have tagName h2',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('#missing').hasTag('h1');

      expect(assert.results).toEqual([
        {
          message: 'Element #missing should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasTag('h1')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasTag('h1')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasTag('h1')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasTag('h1')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasTag('h1')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  describe('invalid arguments to `hasTag`', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 id="title">Title</h1>\n';
      element = document.querySelector('#title');
    });

    test('passing a number to `hasTag` will throw an error', () => {
      expect(() => assert.dom(element).hasTag(1234)).toThrow(
        'You must pass a string to "hasTag". You passed 1234'
      );
    });

    test('passing an object to `hasTag` will throw an error', () => {
      expect(() => assert.dom(element).hasTag({})).toThrow(
        'You must pass a string to "hasTag". You passed [object Object]'
      );
    });
  });
});
