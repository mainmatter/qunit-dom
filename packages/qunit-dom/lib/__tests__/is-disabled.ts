import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isDisabled()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="text">';

    assert.dom('input').isDisabled('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element input is not disabled',
        expected: 'Element input is disabled',
        message: 'custom message',
        result: false,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" disabled>';
      element = document.querySelector('input');
    });

    test('succeeds if element is disabled', () => {
      assert.dom(element).isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input[type="text"][disabled] is disabled',
          expected: 'Element input[type="text"][disabled] is disabled',
          message: 'Element input[type="text"][disabled] is disabled',
          result: true,
        },
      ]);
    });

    test('fails if element is not disabled', () => {
      element.disabled = false;
      assert.dom(element).isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input[type="text"] is not disabled',
          expected: 'Element input[type="text"] is disabled',
          message: 'Element input[type="text"] is disabled',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isDisabled();

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });

    test('succeeds if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      element = document.querySelector('input');

      assert.dom('input').isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is disabled',
          message: 'Element input is disabled',
          result: true,
        },
      ]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text" disabled>';
    });

    test('succeeds if element is disabled', () => {
      assert.dom('input').isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is disabled',
          message: 'Element input is disabled',
          result: true,
        },
      ]);
    });

    test('fails if element is not disabled', () => {
      document.querySelector('input').disabled = false;
      assert.dom('input').isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is not disabled',
          expected: 'Element input is disabled',
          message: 'Element input is disabled',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isDisabled();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="password"] should exist',
          result: false,
        },
      ]);
    });

    test('succeeds if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      assert.dom('input').isDisabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is disabled',
          message: 'Element input is disabled',
          result: true,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isDisabled()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isDisabled()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isDisabled()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isDisabled()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isDisabled()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
    expect(() => assert.dom(document.createElement('div')).isDisabled()).toThrow(
      'Unexpected Element Type: [object HTMLDivElement]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input disabled />';

    assert.dom('input').isDisabled().isDisabled();

    expect(assert.results.length).toEqual(2);
  });
});
