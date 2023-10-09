import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasNoText()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<div id="notempty">Some text</div><div id="empty"></div>\n';
  });

  test('succeeds for correct content', () => {
    assert.dom('#empty').hasNoText('custom message');
    assert.dom(document.querySelector('#empty')).hasNoText('custom message');

    expect(assert.results).toEqual([
      {
        actual: '',
        expected: '',
        message: 'custom message',
        result: true,
      },
      {
        actual: '',
        expected: '',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('#notempty').hasNoText('custom message');
    assert.dom(document.querySelector('#notempty')).hasNoText('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Some text',
        expected: '',
        message: 'custom message',
        result: false,
      },
      {
        actual: 'Some text',
        expected: '',
        message: 'custom message',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasNoText();

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasNoText()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasNoText()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasNoText()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasNoText()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasNoText()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').hasNoText().hasNoText();

    expect(assert.results.length).toEqual(2);
  });
});
