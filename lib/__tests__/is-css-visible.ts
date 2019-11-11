/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isCSSVisible()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('succeeds for correct content', () => {
    document.body.innerHTML = '<div class="foo" style="opacity: 1"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: true,
      },
    ]);
  });

  test('succeeds for correct content with multiple CSS visibility types', () => {
    document.body.innerHTML =
      '<div class="foo" style="opacity: 1; display: block; visibility: visible"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: true,
      },
    ]);
  });

  test('succeeds for checking via styles applied by CSS stylesheets', () => {
    let styleNode = document.createElement('style');
    styleNode.innerHTML = '.foo { opacity: 0 }';
    document.head.appendChild(styleNode);

    document.body.innerHTML = '<div class="foo" style="opacity: 1"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: true,
      },
    ]);
    document.head.removeChild(styleNode);
  });

  test('fails if opacity hides element', () => {
    document.body.innerHTML =
      '<div class="foo" style="opacity: 0; display: block; visibility: visible"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is not CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: false,
      },
    ]);
  });

  test('fails if display hides element', () => {
    document.body.innerHTML =
      '<div class="foo" style="opacity: 1; display: none; visibility: visible"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is not CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: false,
      },
    ]);
  });

  test('fails if visibility hides element', () => {
    document.body.innerHTML =
      '<div class="foo" style="opacity: 1; display: block; visibility: hidden"></div>';

    assert.dom('.foo').isCSSVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element .foo is not CSS visible',
        expected: 'Element .foo is CSS visible',
        message: 'Element .foo is CSS visible',
        result: false,
      },
    ]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').isCSSVisible();
    expect(assert.results).toEqual([
      {
        message: 'Element #missing should exist',
        result: false,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).isCSSVisible()).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).isCSSVisible()).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).isCSSVisible()).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).isCSSVisible()).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).isCSSVisible()).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
