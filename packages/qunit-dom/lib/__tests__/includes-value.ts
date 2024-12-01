import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).includesValue()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML =
      '<textarea class="description">Here: https://example.com - this is the site</textarea>';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('textarea.description').includesValue('https://example.com');
      assert
        .dom(document.querySelector('textarea.description'))
        .includesValue('https://example.com');

      expect(assert.results).toEqual([
        {
          actual: 'Here: https://example.com - this is the site',
          expected: 'https://example.com',
          message: 'Element textarea.description includes value "https://example.com"',
          result: true,
        },
        {
          actual: 'Here: https://example.com - this is the site',
          expected: 'https://example.com',
          message: 'Element textarea.description includes value "https://example.com"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('textarea.description').includesValue('Bart');
      assert.dom(document.querySelector('textarea.description')).includesValue('Bart');

      expect(assert.results).toEqual([
        {
          actual: 'Here: https://example.com - this is the site',
          expected: 'Bart',
          message: 'Element textarea.description includes value "Bart"',
          result: false,
        },
        {
          actual: 'Here: https://example.com - this is the site',
          expected: 'Bart',
          message: 'Element textarea.description includes value "Bart"',
          result: false,
        },
      ]);
    });

    test('fails for wrong content if field is empty', () => {
      document.body.innerHTML = '<textarea>';

      assert.dom('textarea').includesValue('Bart');
      assert.dom(document.querySelector('textarea')).includesValue('Bart');

      expect(assert.results).toEqual([
        {
          actual: '',
          expected: 'Bart',
          message: 'Element textarea includes value "Bart"',
          result: false,
        },
        {
          actual: '',
          expected: 'Bart',
          message: 'Element textarea includes value "Bart"',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').includesValue('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('fails for null', () => {
    assert.dom(null).includesValue('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element <unknown> should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).includesValue('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).includesValue('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).includesValue('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).includesValue('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).includesValue('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input value="foo and other" />';

    assert.dom('textarea').includesValue('foo').includesValue('bar');

    expect(assert.results.length).toEqual(2);
  });
});
