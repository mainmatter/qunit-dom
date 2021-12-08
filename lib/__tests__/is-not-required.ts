/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNotRequired()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<input type="text" required>';

    assert.dom('input').isNotRequired('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'required',
        expected: 'not required',
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

    test('succeeds if element is not required', () => {
      assert.dom(element).isNotRequired();

      expect(assert.results).toEqual([
        {
          actual: 'not required',
          expected: 'not required',
          message: 'Element input[type="text"] is not required',
          result: true,
        },
      ]);
    });

    test('fails if element is required', () => {
      element.required = true;
      assert.dom(element).isNotRequired();

      expect(assert.results).toEqual([
        {
          actual: 'required',
          expected: 'not required',
          message: 'Element input[type="text"][required] is not required',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotRequired();

      expect(assert.results).toEqual([
        {
          message: 'Element <not found> should exist',
          result: false,
        },
      ]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<input type="text">';
    });

    test('succeeds if element is not required', () => {
      assert.dom('input').isNotRequired();

      expect(assert.results).toEqual([
        {
          actual: 'not required',
          expected: 'not required',
          message: 'Element input is not required',
          result: true,
        },
      ]);
    });

    test('fails if element is required', () => {
      document.querySelector('input').required = true;
      assert.dom('input').isNotRequired();

      expect(assert.results).toEqual([
        {
          actual: 'required',
          expected: 'not required',
          message: 'Element input is not required',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotRequired();

      expect(assert.results).toEqual([
        {
          message: 'Element input[type="password"] should exist',
          result: false,
        },
      ]);
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).isNotRequired()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isNotRequired()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotRequired()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isNotRequired()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isNotRequired()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
    expect(() => assert.dom(document.createElement('div')).isRequired()).toThrow(
      'Unexpected Element Type: [object HTMLDivElement]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="checkbox" />';

    assert.dom('input').isNotRequired().isNotRequired();

    expect(assert.results.length).toEqual(2);
  });
});
