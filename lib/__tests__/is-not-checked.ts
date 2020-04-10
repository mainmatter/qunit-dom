/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNotChecked()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="checkbox" checked>';

    assert.dom('input').isNotChecked('foo');

    expect(assert.results).toEqual([
      {
        actual: 'checked',
        expected: 'not checked',
        message: 'foo',
        result: false,
      },
    ]);
  });

  describe('with HTMLElement', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      document.body.innerHTML = '<input type="checkbox">';
      element = document.querySelector('input');
    });

    test('succeeds if element is not checked', () => {
      assert.dom(element).isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'not checked',
          expected: 'not checked',
          message: 'Element input[type="checkbox"] is not checked',
          result: true,
        },
      ]);
    });

    test('fails if element is checked', () => {
      element.checked = true;
      assert.dom(element).isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'checked',
          expected: 'not checked',
          message: 'Element input[type="checkbox"] is not checked',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotChecked();

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
      document.body.innerHTML = '<input type="checkbox">';
    });

    test('succeeds if element is not checked', () => {
      assert.dom('input').isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'not checked',
          expected: 'not checked',
          message: 'Element input is not checked',
          result: true,
        },
      ]);
    });

    test('fails if element is checked', () => {
      document.querySelector('input').checked = true;
      assert.dom('input').isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'checked',
          expected: 'not checked',
          message: 'Element input is not checked',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotChecked();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="password"] should exist',
          result: false,
        },
      ]);
    });
  });

  describe('aria-checked', () => {
    test('succeeds if element is not checked', () => {
      document.body.innerHTML = '<button role="checkbox" aria-checked="false">';

      assert.dom('button').isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'not checked',
          expected: 'not checked',
          message: 'Element button is not checked',
          result: true,
        },
      ]);
    });

    test('fails if element is checked', () => {
      document.body.innerHTML = '<button role="checkbox" aria-checked="true">';

      assert.dom('button').isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'checked',
          expected: 'not checked',
          message: 'Element button is not checked',
          result: false,
        },
      ]);
    });

    test('succeeds if element does not have `aria-checked` attribute', () => {
      document.body.innerHTML = '<button role="checkbox">';

      assert.dom('button').isNotChecked();

      expect(assert.results).toEqual([
        {
          actual: 'not checked',
          expected: 'not checked',
          message: 'Element button is not checked',
          result: true,
        },
      ]);
    });

    test('fails for missing element', () => {
      document.body.innerHTML = '';

      assert.dom('button').isNotChecked();

      expect(assert.results).toEqual([
        {
          message: 'Element button should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isNotChecked()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isNotChecked()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotChecked()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isNotChecked()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isNotChecked()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').isNotChecked().isNotChecked();

    expect(assert.results.length).toEqual(2);
  });
});
