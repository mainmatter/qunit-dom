/* eslint-env jest */
import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isValid()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('invalid', () => {
    test('with no custom message', () => {
      document.body.innerHTML = '<input type="text" required>';

      assert.dom('input').isValid();
      expect(assert.results).toEqual([
        {
          actual: 'not valid',
          expected: 'valid',
          message: 'Element input is not valid',
          result: false,
        },
      ]);
    });

    test('with custom message', () => {
      document.body.innerHTML = '<input type="text" required>';

      assert.dom('input').isValid('custom message');
      expect(assert.results).toEqual([
        {
          actual: 'not valid',
          expected: 'valid',
          message: 'custom message',
          result: false,
        },
      ]);
    });
  });

  describe('valid', () => {
    test('with no custom message', () => {
      document.body.innerHTML = '<input type="text" value="foo" required>';

      assert.dom('input').isValid();
      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'valid',
          message: 'Element input is valid',
          result: true,
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

    test('succeeds if element is valid', () => {
      assert.dom(element).isValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'valid',
          message: 'Element input[type="text"][value="foo"][required] is valid',
          result: true,
        },
      ]);
    });

    test('passes if element is not required', () => {
      element.required = false;
      assert.dom(element).isValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'valid',
          message: 'Element input[type="text"][value="foo"] is valid',
          result: true,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom(null).isValid();

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
      document.body.innerHTML = '<input type="text" value="foo" required>';
    });

    test('succeeds if element is required', () => {
      assert.dom('input').isValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'valid',
          message: 'Element input is valid',
          result: true,
        },
      ]);
    });

    test('succeeds if element is not required', () => {
      document.querySelector('input').required = false;
      assert.dom('input').isValid();

      expect(assert.results).toEqual([
        {
          actual: 'valid',
          expected: 'valid',
          message: 'Element input is valid',
          result: true,
        },
      ]);
    });

    test('fails for missing element', () => {
      assert.dom('input[type="password"]').isValid();

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
    expect(() => assert.dom(5).isValid()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).isValid()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isValid()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).isValid()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).isValid()).toThrow('Unexpected Parameter: [object Document]');
    expect(() => assert.dom(document.createElement('div')).isValid()).toThrow(
      'Unexpected Element Type: [object HTMLDivElement]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input type="text" required/>';

    assert.dom('input').isValid().isValid();

    expect(assert.results.length).toEqual(2);
  });
});
