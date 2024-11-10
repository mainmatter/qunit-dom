import { describe, beforeEach, test, expect, vi } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).includesHtml()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<h1>A\n<b>great</b> thing</h1>\n';
  });

  test('with custom message', () => {
    assert.dom('h1').includesHtml('<b>great</b>', 'custom');

    expect(assert.results).toEqual([
      {
        actual: 'A <b>great</b> thing',
        expected: '<b>great</b>',
        message: 'custom',
        result: true,
      },
    ]);
  });

  test('succeeds for correct content', () => {
    assert.dom('h1').includesHtml('A <b>great</b> thing');

    expect(assert.results).toEqual([
      {
        actual: 'A <b>great</b> thing',
        expected: 'A <b>great</b> thing',
        message: 'Element h1 has html containing "A <b>great</b> thing"',
        result: true,
      },
    ]);
  });

  test('succeeds for correct partial content', () => {
    assert.dom('h1').includesHtml('</b>');

    expect(assert.results).toEqual([
      {
        actual: 'A <b>great</b> thing',
        expected: '</b>',
        message: 'Element h1 has html containing "</b>"',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('h1').includesHtml('<i>foo');

    expect(assert.results).toEqual([
      {
        actual: 'A <b>great</b> thing',
        expected: '<i>foo',
        message: 'Element h1 has html containing "<i>foo"',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('h2').includesHtml('<span>foo</span>');

    expect(assert.results).toEqual([
      {
        message: 'Element h2 should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).includesHtml('<img>')).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).includesHtml('<img>')).toThrow('Unexpected Parameter: true');
    //@ts-ignore
    expect(() => assert.dom(undefined).includesHtml('<img>')).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).includesHtml('<img>')).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).includesHtml('<img>')).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    assert.dom('h1').includesHtml('<img>').includesHtml('bar');

    expect(assert.results.length).toEqual(2);
  });
});
