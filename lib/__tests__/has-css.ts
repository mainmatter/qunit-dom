/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).hasCSS()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div class="foo" style="opacity: 1; width: 200px; text-align: center;">quit-dom ftw!</div>';
  });

  test('works for subset of css assertions', () => {
    assert.dom('.foo').hasCSS({
      opacity: '1',
      width: '200px',
      'text-align': 'center',
    });
    expect(assert.results).toEqual([{
      actual: {opacity: '1', width: '200px', 'text-align': 'center'},
      expected: {opacity: '1', width: '200px', 'text-align': 'center'},
      message: 'Element .foo has style \"{\"opacity\":\"1\",\"width\":\"200px\",\"text-align\":\"center\"}\"',
      result: true,
    }]);
  });
});
