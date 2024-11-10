import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotIncludeHtml()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<h1>An\n<i>okay</i> entity</h1>\n';
  });

  test('with custom message', () => {
    assert.dom('h1').doesNotIncludeHtml('<b>great</b>', 'custom');

    expect(assert.results).toEqual([
      {
        actual: 'Element h1 does not include html "<b>great</b>"',
        expected: 'Element h1 does not include html "<b>great</b>"',
        message: 'custom',
        result: true,
      },
    ]);
  });

  test('succeeds for correct content', () => {
    assert.dom('h1').doesNotIncludeHtml('<style>');

    expect(assert.results).toEqual([
      {
        actual: 'Element h1 does not include html "<style>"',
        expected: 'Element h1 does not include html "<style>"',
        message: 'Element h1 does not include html "<style>"',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('h1').doesNotIncludeHtml('<i>okay');

    expect(assert.results).toEqual([
      {
        actual: 'Element h1 includes html "<i>okay"',
        expected: 'Element h1 does not include html "<i>okay"',
        message: 'Element h1 does not include html "<i>okay"',
        result: false,
      },
    ]);
  });

  test('fails for wrong content when collapsing whitespace', () => {
    assert.dom('h1').doesNotIncludeHtml('An <i>okay</i> entity');

    expect(assert.results).toEqual([
      {
        actual: 'Element h1 includes html "An <i>okay</i> entity"',
        expected: 'Element h1 does not include html "An <i>okay</i> entity"',
        message: 'Element h1 does not include html "An <i>okay</i> entity"',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('h2').doesNotIncludeHtml('<span>foo</span>');

    expect(assert.results).toEqual([
      {
        message: 'Element h2 should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).doesNotIncludeHtml('foo')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).doesNotIncludeHtml('foo')).toThrow('Unexpected Parameter: true');
    //@ts-ignore
    expect(() => assert.dom(undefined).doesNotIncludeHtml('foo')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).doesNotIncludeHtml('foo')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).doesNotIncludeHtml('foo')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    assert.dom('h1').doesNotIncludeHtml('<img>').doesNotIncludeHtml('bar');

    expect(assert.results.length).toEqual(2);
  });
});
