/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).doesNotHaveStyle()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML =
      '<div class="foo" style="opacity: 1; width: 200px; text-align: center;">quit-dom ftw!</div>';
  });

  test('succeeds for incorrect content', () => {
    assert.dom('.foo').doesNotHaveStyle({
      opacity: '0',
      width: '200px',
      'text-align': 'center',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1', width: '200px', 'text-align': 'center' },
        expected: { opacity: '0', width: '200px', 'text-align': 'center' },
        message:
          'Element .foo does not have style "{"opacity":"0","width":"200px","text-align":"center"}"',
        result: true,
      },
    ]);
  });

  test('succeeds for checking incorrect styles applied by CSS stylesheets', () => {
    let styleNode = document.createElement('style');
    styleNode.innerHTML = '.foo { color: blue }';
    document.body.appendChild(styleNode);
    assert.dom('.foo').doesNotHaveStyle({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
      color: 'red',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1', width: '200px', 'text-align': 'center', color: 'blue' },
        expected: { opacity: '1', width: '200px', 'text-align': 'center', color: 'red' },
        message:
          'Element .foo does not have style "{"opacity":"1","width":"200px","text-align":"center","color":"red"}"',
        result: true,
      },
    ]);
    document.body.removeChild(styleNode);
  });

  test('succeeds for partial incorrect style checking', () => {
    assert.dom('.foo').doesNotHaveStyle({
      opacity: '0',
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1' },
        expected: { opacity: '0' },
        message: 'Element .foo does not have style "{"opacity":"0"}"',
        result: true,
      },
    ]);
  });

  test('fails for wrong content', () => {
    assert.dom('.foo').doesNotHaveStyle({
      opacity: 1,
    });
    expect(assert.results).toEqual([
      {
        actual: { opacity: '1' },
        expected: { opacity: 1 },
        message: 'Element .foo does not have style "{"opacity":1}"',
        result: true,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotHaveStyle({
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
    expect(() => assert.dom(5).doesNotHaveStyle({ opacity: 1 })).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotHaveStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: true'
    );
    expect(() => assert.dom(undefined).doesNotHaveStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: undefined'
    );
    expect(() => assert.dom({}).doesNotHaveStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    expect(() => assert.dom(document).doesNotHaveStyle({ opacity: 1 })).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
