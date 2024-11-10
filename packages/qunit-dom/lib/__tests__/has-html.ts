import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasHtml()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<h1>A <b>great</b> thing</h1>\n';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('h1').hasHtml('A <b>great</b> thing');
      assert.dom(document.querySelector('h1')).hasHtml('A <b>great</b> thing');

      expect(assert.results).toEqual([
        {
          actual: 'A <b>great</b> thing',
          expected: 'A <b>great</b> thing',
          message: 'Element h1 has html "A <b>great</b> thing"',
          result: true,
        },
        {
          actual: 'A <b>great</b> thing',
          expected: 'A <b>great</b> thing',
          message: 'Element h1 has html "A <b>great</b> thing"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').hasHtml('<span>foo</span>');
      assert.dom(document.querySelector('h1')).hasHtml('<span>foo</span>');

      expect(assert.results).toEqual([
        {
          actual: 'A <b>great</b> thing',
          expected: '<span>foo</span>',
          message: 'Element h1 does not have html "<span>foo</span>"',
          result: false,
        },
        {
          actual: 'A <b>great</b> thing',
          expected: '<span>foo</span>',
          message: 'Element h1 does not have html "<span>foo</span>"',
          result: false,
        },
      ]);
    });
  });

  describe('regex expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('h1').hasHtml(/<b>great<\/b>/);
      assert.dom(document.querySelector('h1')).hasHtml(/<b>great<\/b>/);

      expect(assert.results).toEqual([
        {
          actual: 'A <b>great</b> thing',
          expected: /<b>great<\/b>/,
          message: 'Element h1 has html matching /<b>great<\\/b>/',
          result: true,
        },
        {
          actual: 'A <b>great</b> thing',
          expected: /<b>great<\/b>/,
          message: 'Element h1 has html matching /<b>great<\\/b>/',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').hasHtml(/<span>foo<\/span>/);
      assert.dom(document.querySelector('h1')).hasHtml(/<span>foo<\/span>/);

      expect(assert.results).toEqual([
        {
          actual: 'A <b>great</b> thing',
          expected: /<span>foo<\/span>/,
          message: 'Element h1 does not have html matching /<span>foo<\\/span>/',
          result: false,
        },
        {
          actual: 'A <b>great</b> thing',
          expected: /<span>foo<\/span>/,
          message: 'Element h1 does not have html matching /<span>foo<\\/span>/',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasHtml('<style>');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('fails for null', () => {
    assert.dom(null).hasHtml('<script>');

    expect(assert.results).toEqual([
      {
        message: 'Element <unknown> should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasHtml(/<b>great<\/b>/)).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasHtml(/<b>great<\/b>/)).toThrow('Unexpected Parameter: true');
    //@ts-ignore
    expect(() => assert.dom(undefined).hasHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).hasHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).hasHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  describe('invalid arguments to `hasHtml`', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1><b>Title</b></h1>\n';
    });

    test('passing a number to `hasHtml` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom('h1').hasHtml(1234)).toThrow(
        'You must pass a string or Regular Expression to "hasHtml". You passed 1234'
      );
    });

    test('passing an object to `hasHtml` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom('h1').hasHtml({})).toThrow(
        'You must pass a string or Regular Expression to "hasHtml". You passed [object Object]'
      );
    });
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1><span id="foo"></span><span class="bar></span></h1>';

    assert
      .dom('h1')
      .hasHtml(/<span id="foo"><\/span>/)
      .hasHtml(/<span class="foo"><\/span>/);

    expect(assert.results.length).toEqual(2);
  });
});
