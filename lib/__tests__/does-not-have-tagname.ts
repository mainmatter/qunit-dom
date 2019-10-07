/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotHaveTagName()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<section id="block">Section</section>\n';

    assert.dom('#block').doesNotHaveTagName('div', 'custom message');

    expect(assert.results).toEqual([
      {
        actual: 'section',
        expected: 'div',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<section id="block">Section</section>\n';
      element = document.querySelector('#block');
    });

    test('succeeds if does not have provided tagName', () => {
      assert.dom(element).doesNotHaveTagName('div');

      expect(assert.results).toEqual([
        {
          actual: 'section',
          expected: 'div',
          message: 'Element section#block does not have tagName div',
          result: true,
        },
      ]);
    });

    test('fails if has provided tagName', () => {
      assert.dom(element).doesNotHaveTagName('section');

      expect(assert.results).toEqual([
        {
          actual: 'section',
          expected: 'section',
          message: 'Element section#block has tagName section',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).doesNotHaveTagName('div');

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
      document.body.innerHTML = '<section id="block">Section</section>\n';
    });

    test('succeeds if does not have provided tagName', () => {
      assert.dom('#block').doesNotHaveTagName('div');

      expect(assert.results).toEqual([
        {
          actual: 'section',
          expected: 'div',
          message: 'Element #block does not have tagName div',
          result: true,
        },
      ]);
    });

    test('fails if has provided tagName', () => {
      assert.dom('#block').doesNotHaveTagName('section');

      expect(assert.results).toEqual([
        {
          actual: 'section',
          expected: 'section',
          message: 'Element #block has tagName section',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('#missing').doesNotHaveTagName('div');

      expect(assert.results).toEqual([
        {
          message: 'Element #missing should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).doesNotHaveTagName('div')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotHaveTagName('div')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotHaveTagName('div')).toThrow(
      'Unexpected Parameter: undefined'
    );
    expect(() => assert.dom({}).doesNotHaveTagName('div')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    expect(() => assert.dom(document).doesNotHaveTagName('div')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  describe('invalid arguments to `doesNotHaveTagName`', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<section id="block">Section</section>\n';
      element = document.querySelector('#block');
    });

    test('passing a number to `doesNotHaveTagName` will throw an error', () => {
      expect(() => assert.dom(element).doesNotHaveTagName(1234)).toThrow(
        'You must pass a string to "doesNotHaveTagName". You passed 1234'
      );
    });

    test('passing an object to `doesNotHaveTagName` will throw an error', () => {
      expect(() => assert.dom(element).doesNotHaveTagName({})).toThrow(
        'You must pass a string to "doesNotHaveTagName". You passed [object Object]'
      );
    });
  });
});
