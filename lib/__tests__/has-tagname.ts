/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasTagName()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h1 id="title">Title</h1>\n';

    assert.dom('#title').hasTagName('h1', 'custom message');

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
    let element: Element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 id="title">Title</h1>\n';
      element = document.querySelector('#title');
    });

    test('succeeds for correct tagName', () => {
      assert.dom(element).hasTagName('h1');

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
      assert.dom(element).hasTagName('h2');

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
      assert.dom(null).hasTagName('h1');

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
      assert.dom('#title').hasTagName('h1');

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
      assert.dom('#title').hasTagName('h2');

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
      assert.dom('#missing').hasTagName('h1');

      expect(assert.results).toEqual([
        {
          message: 'Element #missing should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasTagName('h1')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasTagName('h1')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasTagName('h1')).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasTagName('h1')).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasTagName('h1')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  describe('invalid arguments to `hasTagName`', () => {
    let element: Element;

    beforeEach(() => {
      document.body.innerHTML = '<h1 id="title">Title</h1>\n';
      element = document.querySelector('#title');
    });

    test('passing a number to `hasTagName` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).hasTagName(1234)).toThrow(
        'You must pass a string to "hasTagName". You passed 1234'
      );
    });

    test('passing an object to `hasTagName` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom(element).hasTagName({})).toThrow(
        'You must pass a string to "hasTagName". You passed [object Object]'
      );
    });
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').hasTagName('h1').hasTagName('foo');

    expect(assert.results.length).toEqual(2);
  });
});
