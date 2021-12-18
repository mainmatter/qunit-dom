/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

/*
 * JSDom based tests aren't able to discern widths as we define it. Specifically,
 * the JSDom tests don't do layouting, therefore calculating `clientWidth` or `scrollWidth`
 * won't work. As a result, we need to use Ember's test infrastructure to correctly assess
 * visibility, as those tests run in a browser environment.
 *
 * Read more here: https://github.com/jsdom/jsdom/issues/2310
 *
 * Tests for the success cases of isOverflowing can be found in tests/acceptance/qunit-dom-test.js
 */
describe('assert.dom(...).isOverflowing()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('passes if inner element exceeds outer elements width', () => {
    document.body.innerHTML = '<div id="foo" />';
    const foo = document.getElementById('foo');
    // clientWidth and scrollWidth are read-only properties, so Typescript gets mad if we try to assign them directly
    Object.defineProperties(foo, {
      clientWidth: {
        value: 50,
        writable: true,
      },
      scrollWidth: {
        value: 100,
        writable: true,
      },
    });

    assert.dom('#foo').isOverflowing('foo is not overflowing');

    expect(assert.results).toEqual([
      {
        message: 'foo is not overflowing',
        result: true,
        actual: '#foo has width 50 and scrollWidth 100',
        expected: '#foo has scrollWidth greater than 50',
      },
    ]);
  });

  test('fails if inner element has smaller width than outer element', () => {
    document.body.innerHTML = '<div id="foo" />';
    const foo = document.getElementById('foo');
    Object.defineProperties(foo, {
      clientWidth: {
        value: 100,
        writable: true,
      },
      scrollWidth: {
        value: 100,
        writable: true,
      },
    });

    assert.dom('#foo').isOverflowing('foo is not overflowing');

    expect(assert.results).toEqual([
      {
        message: 'foo is not overflowing',
        result: false,
        actual: '#foo has width 100 and scrollWidth 100',
        expected: '#foo has scrollWidth greater than 100',
      },
    ]);
  });
});
