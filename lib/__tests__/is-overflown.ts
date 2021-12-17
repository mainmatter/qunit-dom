/* eslint-env jest */

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(...).isOverflown()', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('passes if inner element exceeds outer elements width', () => {
    // Element.clientWidth and Element.scrollWidth APIs are not avaliable in jsdom, so testing this the brute-force way
    // Read more here: https://github.com/jsdom/jsdom/issues/2310
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

    assert.dom('#foo').isOverflown('foo is not overflown');

    expect(assert.results).toEqual([
      {
        message: 'foo is not overflown',
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

    assert.dom('#foo').isOverflown('foo is not overflown');

    expect(assert.results).toEqual([
      {
        message: 'foo is not overflown',
        result: false,
        actual: '#foo has width 100 and scrollWidth 100',
        expected: '#foo has scrollWidth greater than 100',
      },
    ]);
  });
});
