/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isEnabled()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="text" disabled>';

    assert.dom('input').isEnabled('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element input is disabled',
        expected: 'Element input is enabled',
        message: 'custom message',
        result: false,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
      element = document.querySelector('input');
    });

    test('succeeds if element is enabled', () => {
      assert.dom(element).isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input[type="text"] is enabled',
          expected: 'Element input[type="text"] is enabled',
          message: 'Element input[type="text"] is enabled',
          result: true,
        },
      ]);
    });

    test('fails if element is disabled', () => {
      element.disabled = true;
      assert.dom(element).isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input[type="text"][disabled] is disabled',
          expected: 'Element input[type="text"][disabled] is enabled',
          message: 'Element input[type="text"][disabled] is enabled',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isEnabled();

      expect(assert.results).toEqual([
        {
          message: 'Element <unknown> should exist',
          result: false,
        },
      ]);
    });

    test('fails if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      element = document.querySelector('input');

      assert.dom('input').isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is enabled',
          message: 'Element input is enabled',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
    });

    test('succeeds if element is enabled', () => {
      assert.dom('input').isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is enabled',
          expected: 'Element input is enabled',
          message: 'Element input is enabled',
          result: true,
        },
      ]);
    });

    test('fails if element is disabled', () => {
      document.querySelector('input').disabled = true;
      assert.dom('input').isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is enabled',
          message: 'Element input is enabled',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isEnabled();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="password"] should exist',
          result: false,
        },
      ]);
    });

    test('fails if element is disabled with text', () => {
      document.body.innerHTML = '<input type="text" disabled="false">';
      assert.dom('input').isEnabled();

      expect(assert.results).toEqual([
        {
          actual: 'Element input is disabled',
          expected: 'Element input is enabled',
          message: 'Element input is enabled',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isEnabled()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isEnabled()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isEnabled()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isEnabled()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isEnabled()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
    expect(() => assert.dom(document.createElement('div')).isEnabled()).toThrow(
      'Unexpected Element Type: [object HTMLDivElement]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert
      .dom('input')
      .isEnabled()
      .isEnabled();

    expect(assert.results.length).toEqual(2);
  });
});
