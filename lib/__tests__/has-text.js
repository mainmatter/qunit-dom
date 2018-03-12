/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasText()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('with custom message', () => {
    document.body.innerHTML = '<h2 id="title">\n\tWelcome to <b>QUnit</b>\n</h2>\n';

    assert.dom('#title').hasText('Welcome to QUnit', 'custom message');

    expect(assert.results).toEqual([{
      actual: 'Welcome to QUnit',
      expected: 'Welcome to QUnit',
      message: 'custom message',
      result: true,
    }]);
  });

  describe('with HTMLElement', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h2 id="title">\n\tWelcome to <b>QUnit</b>\n</h2>\n';
      element = document.querySelector('#title');
    });

    test('succeeds for correct content', () => {
      assert.dom(element).hasText('Welcome to QUnit');

      expect(assert.results).toEqual([{
        actual: 'Welcome to QUnit',
        expected: 'Welcome to QUnit',
        message: 'Element h2#title has text "Welcome to QUnit"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom(element).hasText('Welcome to Mocha');

      expect(assert.results).toEqual([{
        actual: 'Welcome to QUnit',
        expected: 'Welcome to Mocha',
        message: 'Element h2#title has text "Welcome to Mocha"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom(null).hasText('Welcome to QUnit');

      expect(assert.results).toEqual([{
        message: 'Element <unknown> exists',
        result: false,
      }]);
    });
  });

  describe('with selector', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h2 id="title">\n\tWelcome to <b>QUnit</b>\n</h2>\n';
    });

    test('succeeds for correct content', () => {
      assert.dom('#title').hasText('Welcome to QUnit');

      expect(assert.results).toEqual([{
        actual: 'Welcome to QUnit',
        expected: 'Welcome to QUnit',
        message: 'Element #title has text "Welcome to QUnit"',
        result: true,
      }]);
    });

    test('fails for wrong content', () => {
      assert.dom('#title').hasText('Welcome to Mocha');

      expect(assert.results).toEqual([{
        actual: 'Welcome to QUnit',
        expected: 'Welcome to Mocha',
        message: 'Element #title has text "Welcome to Mocha"',
        result: false,
      }]);
    });

    test('fails for missing element', () => {
      assert.dom('#missing').hasText('foo');

      expect(assert.results).toEqual([{
        message: 'Element #missing exists',
        result: false,
      }]);
    });
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasText('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasText('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasText('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasText('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasText('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });

  describe('invalid arguments to `hasText`', () => {
    let element;

    beforeEach(() => {
      document.body.innerHTML = '<h2 id="title">\n\tWelcome to <b>QUnit</b>\n</h2>\n';
      element = document.querySelector('#title');
    });

    test('passing a number to `hasText` will throw an error', () => {
      expect(() => assert.dom(element).hasText(1234)).toThrow('You must pass a string or Regular Expression to "hasText". You passed 1234');
    });

    test('passing an object to `hasText` will throw an error', () => {
      expect(() => assert.dom(element).hasText({})).toThrow('You must pass a string or Regular Expression to "hasText". You passed [object Object]');
    });
  });
});
