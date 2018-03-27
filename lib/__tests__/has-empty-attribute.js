/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasEmptyAttribute()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<button class="share" checked></button>';
  });

  test('succeeds for attribute without value', () => {
    assert.dom('.share').hasAttribute('checked', '');
    assert.dom('.share').hasEmptyAttribute('checked');
    assert.dom(document.querySelector('.share')).hasEmptyAttribute('checked');

    expect(assert.results).toEqual([{
      actual: 'Element .share has attribute "checked" with value ""',
      expected: 'Element .share has attribute "checked" with value ""',
      message: 'Element .share has attribute "checked" with value ""',
      result: true,
    }, {
      actual: 'Element .share has attribute "checked" with value ""',
      expected: 'Element .share has attribute "checked" with value ""',
      message: 'Element .share has attribute "checked" with value ""',
      result: true,
    }, {
      actual: 'Element button.share[checked] has attribute "checked" with value ""',
      expected: 'Element button.share[checked] has attribute "checked" with value ""',
      message: 'Element button.share[checked] has attribute "checked" with value ""',
      result: true,
    }]);
  });

  test('fails for non-empty attribute', () => {
    document.body.innerHTML = '<button class="share" checked=true></button>';

    assert.dom('.share').hasEmptyAttribute('checked');
    assert.dom(document.querySelector('.share')).hasEmptyAttribute('checked');

    expect(assert.results).toEqual([{
      actual: 'Element .share has attribute "checked" with value "true"',
      expected: 'Element .share has attribute "checked" with value ""',
      message: 'Element .share has attribute "checked" with value ""',
      result: false,
    }, {
      actual: 'Element button.share[checked="true"] has attribute "checked" with value "true"',
      expected: 'Element button.share[checked="true"] has attribute "checked" with value ""',
      message: 'Element button.share[checked="true"] has attribute "checked" with value ""',
      result: false,
    }]);
  });

  test('fails for missing attribute', () => {
    assert.dom('.share').hasEmptyAttribute('disabled');
    assert.dom(document.querySelector('.share')).hasEmptyAttribute('disabled');

    expect(assert.results).toEqual([{
      actual: 'Element .share does not have attribute "disabled"',
      expected: 'Element .share has attribute "disabled" with value ""',
      message: 'Element .share has attribute "disabled" with value ""',
      result: false,
    }, {
      actual: 'Element button.share[checked] does not have attribute "disabled"',
      expected: 'Element button.share[checked] has attribute "disabled" with value ""',
      message: 'Element button.share[checked] has attribute "disabled" with value ""',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').hasEmptyAttribute('foo');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).hasAttribute('foo')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).hasAttribute('foo')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).hasAttribute('foo')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).hasAttribute('foo')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).hasAttribute('foo')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
