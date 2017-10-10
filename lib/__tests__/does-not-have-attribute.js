/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).doesNotHaveAttribute()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<input type="password" required>';
  });

  test('succeeds for correct content', () => {
    assert.dom('input').doesNotHaveAttribute('disabled');
    assert.dom(document.querySelector('input')).doesNotHaveAttribute('disabled');

    expect(assert.results).toEqual([{
      actual: 'Element input does not have attribute "disabled"',
      expected: 'Element input does not have attribute "disabled"',
      message: 'Element input does not have attribute "disabled"',
      result: true,
    }, {
      actual: 'Element input[type="password"][required] does not have attribute "disabled"',
      expected: 'Element input[type="password"][required] does not have attribute "disabled"',
      message: 'Element input[type="password"][required] does not have attribute "disabled"',
      result: true,
    }]);
  });

  test('fails for wrong content (string value)', () => {
    assert.dom('input').doesNotHaveAttribute('type');
    assert.dom(document.querySelector('input')).doesNotHaveAttribute('type');

    expect(assert.results).toEqual([{
      actual: 'Element input has attribute "type" with value "password"',
      expected: 'Element input does not have attribute "type"',
      message: 'Element input does not have attribute "type"',
      result: false,
    }, {
      actual: 'Element input[type="password"][required] has attribute "type" with value "password"',
      expected: 'Element input[type="password"][required] does not have attribute "type"',
      message: 'Element input[type="password"][required] does not have attribute "type"',
      result: false,
    }]);
  });

  test('fails for wrong content (string value)', () => {
    assert.dom('input').doesNotHaveAttribute('required');
    assert.dom(document.querySelector('input')).doesNotHaveAttribute('required');

    expect(assert.results).toEqual([{
      actual: 'Element input has attribute "required" with value ""',
      expected: 'Element input does not have attribute "required"',
      message: 'Element input does not have attribute "required"',
      result: false,
    }, {
      actual: 'Element input[type="password"][required] has attribute "required" with value ""',
      expected: 'Element input[type="password"][required] does not have attribute "required"',
      message: 'Element input[type="password"][required] does not have attribute "required"',
      result: false,
    }]);
  });

  test('fails for missing element', () => {
    assert.dom('#missing').doesNotHaveAttribute('disabled');

    expect(assert.results).toEqual([{
      message: 'Element #missing exists',
      result: false,
    }]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => assert.dom(5).doesNotHaveAttribute('disabled')).toThrow('Unexpected Parameter: 5');
    expect(() => assert.dom(true).doesNotHaveAttribute('disabled')).toThrow('Unexpected Parameter: true');
    expect(() => assert.dom(undefined).doesNotHaveAttribute('disabled')).toThrow('Unexpected Parameter: undefined');
    expect(() => assert.dom({}).doesNotHaveAttribute('disabled')).toThrow('Unexpected Parameter: [object Object]');
    expect(() => assert.dom(document).doesNotHaveAttribute('disabled')).toThrow('Unexpected Parameter: [object HTMLDocument]');
  });
});
