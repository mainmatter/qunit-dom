import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasAria()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();

    document.body.innerHTML = '<button aria-pressed="true">';
  });

  // this just delegates to `hasAttribute()` so we don't need the full range of tests here
  test('smoke test', () => {
    assert.dom('button').hasAria('pressed', 'true');
    assert.dom('button').doesNotHaveAria('hidden');
    assert.dom('button').hasNoAria('hidden');
    assert.dom('button').lacksAria('hidden');

    expect(assert.results).toEqual([
      {
        actual: 'Element button has attribute "aria-pressed" with value "true"',
        expected: 'Element button has attribute "aria-pressed" with value "true"',
        message: 'Element button has attribute "aria-pressed" with value "true"',
        result: true,
      },
      {
        actual: 'Element button does not have attribute "aria-hidden"',
        expected: 'Element button does not have attribute "aria-hidden"',
        message: 'Element button does not have attribute "aria-hidden"',
        result: true,
      },
      {
        actual: 'Element button does not have attribute "aria-hidden"',
        expected: 'Element button does not have attribute "aria-hidden"',
        message: 'Element button does not have attribute "aria-hidden"',
        result: true,
      },
      {
        actual: 'Element button does not have attribute "aria-hidden"',
        expected: 'Element button does not have attribute "aria-hidden"',
        message: 'Element button does not have attribute "aria-hidden"',
        result: true,
      },
    ]);
  });
});
