/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).hasPseudoElementStyle()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
    document.body.innerHTML = '<div class="foo">quit-dom ftw!</div>';
  });

  test('builds correct messages', () => {
    assert.dom('.foo').hasPseudoElementStyle('::after', { content: '";"' });
    expect(assert.results[0].message).toEqual(
      'Element .foo::after has style "{"content":"\\";\\""}"'
    );

    assert.dom('.foo').hasPseudoElementStyle(':after', { content: '";"' });
    expect(assert.results[0].message).toEqual(
      'Element .foo::after has style "{"content":"\\";\\""}"'
    );
  });
});
