/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasAnyText()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<button class="share"></button>';
  });

  test('succeeds for correct content', () => {
    document.querySelector('button.share').textContent = 'Share';

    assert.dom('button.share').hasAnyText('custom message');
    assert.dom(document.querySelector('button.share')).hasAnyText('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element button.share has a text',
        expected: 'Element button.share has a text',
        message: 'custom message',
        result: true,
      },
      {
        actual: 'Element button.share has a text',
        expected: 'Element button.share has a text',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('button.share').hasAnyText('custom message');
    assert.dom(document.querySelector('button.share')).hasAnyText('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element button.share has no text',
        expected: 'Element button.share has a text',
        message: 'custom message',
        result: false,
      },
      {
        actual: 'Element button.share has no text',
        expected: 'Element button.share has a text',
        message: 'custom message',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasAnyText();

    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasAnyText()).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasAnyText()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasAnyText()).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => assert.dom({}).hasAnyText()).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => assert.dom(document).hasAnyText()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert
      .dom('h1')
      .hasAnyText()
      .hasAnyText();

    expect(assert.results.length).toEqual(2);
  });
});
