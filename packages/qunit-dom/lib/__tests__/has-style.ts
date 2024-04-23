import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasStyle()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML =
      '<div class="foo" style="opacity: 1; width: 200px; text-align: center; --color-text: #FFF;">quit-dom ftw!</div>';

    //@ts-ignore
    document.querySelector('.foo').style.setProperty('--color-background', '#333');
  });

  test('succeeds for correct content', () => {
    assert.dom('.foo').hasStyle({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1', width: '200px', 'text-align': 'center' },
        expected: { opacity: '1', width: '200px', 'text-align': 'center' },
        message: 'Element .foo has style "{"opacity":"1","width":"200px","text-align":"center"}"',
        result: true,
      },
    ]);
  });

  test('succeeds for checking styles applied by CSS stylesheets', () => {
    let styleNode = document.createElement('style');
    styleNode.innerHTML = '.foo { color: blue }';
    document.body.appendChild(styleNode);
    assert.dom('.foo').hasStyle({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
      color: 'blue',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1', width: '200px', 'text-align': 'center', color: 'blue' },
        expected: { opacity: '1', width: '200px', 'text-align': 'center', color: 'blue' },
        message:
          'Element .foo has style "{"opacity":"1","width":"200px","text-align":"center","color":"blue"}"',
        result: true,
      },
    ]);
    document.body.removeChild(styleNode);
  });

  test('succeeds for partial style checking', () => {
    assert.dom('.foo').hasStyle({
      opacity: '1',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1' },
        expected: { opacity: '1' },
        message: 'Element .foo has style "{"opacity":"1"}"',
        result: true,
      },
    ]);
  });

  test('succeeds for custom property', () => {
    assert.dom('.foo').hasStyle({
      '--color-text': '#FFF',
      '--color-background': '#333',
    });

    expect(assert.results).toEqual([
      {
        actual: { '--color-text': '#FFF', '--color-background': '#333' },
        expected: { '--color-text': '#FFF', '--color-background': '#333' },
        message: 'Element .foo has style "{"--color-text":"#FFF","--color-background":"#333"}"',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('.foo').hasStyle({
      opacity: 0,
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1' },
        expected: { opacity: 0 },
        message: 'Element .foo has style "{"opacity":0}"',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasStyle({
      opacity: 0,
    });
    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => assert.dom(5).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: 5');
    //@ts-ignore
    expect(() => assert.dom(true).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: undefined'
    );
    //@ts-ignore
    expect(() => assert.dom({}).hasStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => assert.dom(document).hasStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });

  test('throws for empty expectation object', () => {
    expect(() => assert.dom('div').hasStyle({})).toThrow(
      'Missing style expectations. There must be at least one style property in the passed in expectation object.'
    );
  });

  test('supports chaining', () => {
    document.body.innerHTML = '<h1 class="bar">foo</h1>';

    assert.dom('h1').hasStyle({ top: 42 }).hasStyle({ left: 0 });

    expect(assert.results.length).toEqual(2);
  });

  test('succeeds for checking styles using camelCase property as argument', () => {
    assert.dom('.foo').hasStyle({
      opacity: '1',
      width: '200px',
      textAlign: 'center',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1', width: '200px', textAlign: 'center' },
        expected: { opacity: '1', width: '200px', textAlign: 'center' },
        message: 'Element .foo has style "{"opacity":"1","width":"200px","textAlign":"center"}"',
        result: true,
      },
    ]);
  });
});
