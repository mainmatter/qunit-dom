import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotIncludeValue()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML =
      '<textarea class="description">Lorem ipsum and other things :)</textarea>';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('textarea.description').doesNotIncludeValue('https://example.com');
      assert
        .dom(document.querySelector('textarea.description'))
        .doesNotIncludeValue('https://example.com');

      expect(assert.results).toEqual([
        {
          actual: 'Lorem ipsum and other things :)',
          expected: 'https://example.com',
          message: 'Element textarea.description does not include value "https://example.com"',
          result: true,
        },
        {
          actual: 'Lorem ipsum and other things :)',
          expected: 'https://example.com',
          message: 'Element textarea.description does not include value "https://example.com"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('textarea.description').doesNotIncludeValue('Lorem ipsum');
      assert.dom(document.querySelector('textarea.description')).doesNotIncludeValue('Lorem ipsum');

      expect(assert.results).toEqual([
        {
          actual: 'Lorem ipsum and other things :)',
          expected: 'Lorem ipsum',
          message: 'Element textarea.description does not include value "Lorem ipsum"',
          result: false,
        },
        {
          actual: 'Lorem ipsum and other things :)',
          expected: 'Lorem ipsum',
          message: 'Element textarea.description does not include value "Lorem ipsum"',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotIncludeValue('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('fails for null', () => {
    assert.dom(null).doesNotIncludeValue('foo');

    expect(assert.results).toEqual([
      {
        message: 'Element <unknown> should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).doesNotIncludeValue('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).doesNotIncludeValue('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotIncludeValue('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).doesNotIncludeValue('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).doesNotIncludeValue('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<input value="foo and other" />';

    assert.dom('textarea').doesNotIncludeValue('foo').doesNotIncludeValue('bar');

    expect(assert.results.length).toEqual(2);
  });
});
