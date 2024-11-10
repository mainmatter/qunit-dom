import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotHaveHtml()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<h1>A <i>missing</i> object</h1>\n';
  });

  describe('string expected', () => {
    test('succeeds for correct content', () => {
      assert.dom('h1').doesNotHaveHtml('A <b>great</b> thing');
      assert.dom(document.querySelector('h1')).doesNotHaveHtml('A <b>great</b> thing');

      expect(assert.results).toEqual([
        {
          actual: 'A <i>missing</i> object',
          expected: 'A <b>great</b> thing',
          message: 'Element h1 does not have html "A <b>great</b> thing"',
          result: true,
        },
        {
          actual: 'A <i>missing</i> object',
          expected: 'A <b>great</b> thing',
          message: 'Element h1 does not have html "A <b>great</b> thing"',
          result: true,
        },
      ]);
    });

    test('fails for wrong content', () => {
      assert.dom('h1').doesNotHaveHtml('A <i>missing</i> object');
      assert.dom(document.querySelector('h1')).doesNotHaveHtml('A <i>missing</i> object');

      expect(assert.results).toEqual([
        {
          actual: 'A <i>missing</i> object',
          expected: 'A <i>missing</i> object',
          message: 'Element h1 has html "A <i>missing</i> object"',
          result: false,
        },
        {
          actual: 'A <i>missing</i> object',
          expected: 'A <i>missing</i> object',
          message: 'Element h1 has html "A <i>missing</i> object"',
          result: false,
        },
      ]);
    });
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotHaveHtml('<style>');

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('fails for null', () => {
    assert.dom(null).doesNotHaveHtml('<script>');

    expect(assert.results).toEqual([
      {
        message: 'Element <unknown> should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).doesNotHaveHtml(/<b>great<\/b>/)).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).doesNotHaveHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: true'
    );
    //@ts-ignore
    expect(() => assert.dom(undefined).doesNotHaveHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).doesNotHaveHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).doesNotHaveHtml(/<b>great<\/b>/)).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  describe('invalid arguments to `doesNotHaveHtml`', () => {
    beforeEach(() => {
      document.body.innerHTML = '<h1><b>Title</b></h1>\n';
    });

    test('passing a number to `doesNotHaveHtml` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom('h1').doesNotHaveHtml(1234)).toThrow(
        'You must pass a string to "doesNotHaveHtml". You passed 1234'
      );
    });

    test('passing an object to `doesNotHaveHtml` will throw an error', () => {
      //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
      expect(() => assert.dom('h1').doesNotHaveHtml({})).toThrow(
        'You must pass a string to "doesNotHaveHtml". You passed [object Object]'
      );
    });
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1><span id="foo"></span><span class="bar></span></h1>';

    assert
      .dom('h1')
      .doesNotHaveHtml('<span id="foo"></span>')
      .doesNotHaveHtml('<span class="foo"></span>');

    expect(assert.results.length).toEqual(2);
  });
});
