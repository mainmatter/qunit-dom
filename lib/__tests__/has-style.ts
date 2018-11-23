/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasStyle()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div class="foo" style="opacity: 1; width: 200px; text-align: center;">quit-dom ftw!</div>';
  });

  test('succeeds for correct content', () => {
    assert.dom('.foo').hasStyle({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
    });
    expect(assert.results).toEqual([{
      actual: { opacity: '1', width: '200px', 'text-align': 'center' },
      expected: { opacity: '1', width: '200px', 'text-align': 'center' },
      message: 'Element .foo has style \"{\"opacity\":\"1\",\"width\":\"200px\",\"text-align\":\"center\"}\"',
      result: true,
    }]);
  });

  test('succeeds for checking styles applied by CSS stylesheets', () => {
    var styleNode = document.createElement('style');
    styleNode.innerHTML = '.foo { color: blue }';
    document.body.appendChild(styleNode);
    assert.dom('.foo').hasStyle({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
      color: 'blue',
    });
    expect(assert.results).toEqual([{
      actual: { opacity: '1', width: '200px', 'text-align': 'center', color: 'blue' },
      expected: { opacity: '1', width: '200px', 'text-align': 'center', color: 'blue' },
      message: 'Element .foo has style \"{\"opacity\":\"1\",\"width\":\"200px\",\"text-align\":\"center\",\"color\":\"blue\"}\"',
      result: true,
    }]);
    document.body.removeChild(styleNode);
  });

  test('succeeds for partial style checking', () => {
    assert.dom('.foo').hasStyle({
      opacity: '1',
    });
    expect(assert.results).toEqual([{
      actual: { opacity: '1' },
      expected: { opacity: '1' },
      message: 'Element .foo has style \"{\"opacity\":\"1\"}\"',
      result: true,
    }]);
  });

  test('fails for wrong content', () => {
    assert.dom('.foo').hasStyle({
      opacity: 0,
    });
    expect(assert.results).toEqual([{
      actual: { opacity: '1' },
      expected: { opacity: 0 },
      message: 'Element .foo has style \"{\"opacity\":0}\"',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasStyle({
      opacity: 0,
    });
    expect(assert.results).toEqual([{
      message: 'Element #missing should exist',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasStyle({ opacity: 1 })).toThrow('Unexpected Parameter: [object Document]');
  });
});
