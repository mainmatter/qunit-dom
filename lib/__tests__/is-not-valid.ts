/* eslint-env jest */
import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isNotValid()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('invalid', () => {
    test('with no custom message', () => {
      document.body.innerHTML = '<input type="text" required>';

      assert.dom('input').isNotValid();
      expect(assert.results).toEqual([
        {
          actual: 'not valid',
          expected: 'not valid',
          message: 'Element input is not valid',
          result: true,
        },
      ]);
    });

    test('with custom message', () => {
      document.body.innerHTML = '<input type="text" required>';

      assert.dom('input').isNotValid('custom message');
      expect(assert.results).toEqual([
        {
          actual: 'not valid',
          expected: 'not valid',
          message: 'custom message',
          result: true,
        },
      ]);
    });
  });

  describe('valid', () => {
    test('with no custom message', () => {
      document.body.innerHTML = '<input type="text" value="foo" required>';

      assert.dom('input').isNotValid();
      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'not valid',
          message: 'Element input is valid',
          result: false,
        },
      ]);
    });
  });

  describe('with HTMLElement', () => {
    let element: HTMLInputElement;

    beforeEach(() => {
      document.body.innerHTML = '<input type="text" value="foo" required>';
      element = document.querySelector('input');
    });

    test('fails if element is valid', () => {
      assert.dom(element).isNotValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'not valid',
          message: 'Element input[type="text"][value="foo"][required] is valid',
          result: false,
        },
      ]);
    });

    test('fails if element is not required', () => {
      element.required = false;
      assert.dom(element).isNotValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'not valid',
          message: 'Element input[type="text"][value="foo"] is valid',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isNotValid();

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
      document.body.innerHTML = '<input type="text" value="foo" required>';
    });

    test('fails if element is required', () => {
      assert.dom('input').isNotValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'not valid',
          message: 'Element input is valid',
          result: false,
        },
      ]);
    });

    test('fails if element is not required', () => {
      document.querySelector('input').required = false;
      assert.dom('input').isNotValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'not valid',
          message: 'Element input is valid',
          result: false,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isNotValid();

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
    expect(() => assert.dom(5).isNotValid()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isNotValid()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isNotValid()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isNotValid()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isNotValid()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
    expect(() => assert.dom(document.createElement('div')).isNotValid()).toThrow(
      'Unexpected Element Type: [object HTMLDivElement]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="text" required/>';

    assert.dom('input').isNotValid().isNotValid();

    expect(assert.results.length).toEqual(2);
  });
});
