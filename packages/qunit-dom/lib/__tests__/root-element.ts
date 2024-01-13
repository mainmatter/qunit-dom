import { describe, beforeEach, test, expect } from 'vitest';

import TestAssertions from '../helpers/test-assertions';

describe('assert.dom(..., rootElement)', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  test('passing an Element as rootElement', () => {
    document.body.innerHTML = `
      <span class="target">dedcoy<span>

      <h1 class="parent">
        <span class="target">real target<span>
      </h1>
    `;

    const rootElement = document.querySelector('.parent');

    assert.dom('.target', rootElement).exists({ count: 1 });
    assert.dom('.target', rootElement).hasText('real target');

    expect(assert.results).toEqual([
      {
        result: true,
        actual: 'Element .target exists once',
        expected: 'Element .target exists once',
        message: 'Element .target exists once',
      },
      {
        result: true,
        actual: 'real target',
        expected: 'real target',
        message: 'Element .target has text "real target"',
      },
    ]);
  });

  test('not passing anything as rootElement', () => {
    document.body.innerHTML = `
      <span class="target">decoy<span>

      <h1 class="parent">
        <span class="target">real target<span>
      </h1>
    `;

    assert.dom('.target').exists({ count: 2 });

    expect(assert.results).toEqual([
      {
        result: true,
        actual: 'Element .target exists twice',
        expected: 'Element .target exists twice',
        message: 'Element .target exists twice',
      },
    ]);
  });

  test('passing document as rootElement', () => {
    document.body.innerHTML = `
      <span class="target">decoy<span>

      <h1 class="parent">
        <span class="target">real target<span>
      </h1>
    `;

    assert.dom('.target', document).exists({ count: 2 });

    expect(assert.results).toEqual([
      {
        result: true,
        actual: 'Element .target exists twice',
        expected: 'Element .target exists twice',
        message: 'Element .target exists twice',
      },
    ]);
  });

  test('passing null as rootElement', () => {
    document.body.innerHTML = `
      <span class="target">decoy<span>

      <h1 class="parent">
        <span class="target">real target<span>
      </h1>
    `;

    assert.dom('.target', null).exists({ count: 2 });

    expect(assert.results).toEqual([
      {
        result: true,
        actual: 'Element .target exists twice',
        expected: 'Element .target exists twice',
        message: 'Element .target exists twice',
      },
    ]);
  });

  test('passing shadow root as rootElement', () => {
    document.body.innerHTML = `
      <div id="container">
        <span class="target">decoy<span>
      </div>
    `;

    const container = document.getElementById('container');
    const shadowRoot = container.attachShadow({ mode: 'closed' });

    shadowRoot.innerHTML = '<span class="target">real target<span>';

    assert.dom('.target').exists({ count: 1 }, 'Only decoy element is found outside shadow root');
    assert.dom('.target').hasText('real target', 'decoy element text');

    assert.dom('.target', shadowRoot).exists({ count: 1 }, 'Only target found in shadow root');
    assert.dom('.target', shadowRoot).hasText('real target', 'Target element text');

    console.log(assert.results);

    expect(assert.results).toEqual([
      {
        result: true,
        actual: 'Element .target exists once',
        expected: 'Element .target exists once',
        message: 'Only decoy element is found outside shadow root',
      },
      {
        result: false,
        actual: 'decoy',
        expected: 'real target',
        message: 'decoy element text',
      },
      {
        result: true,
        actual: 'Element .target exists once',
        expected: 'Element .target exists once',
        message: 'Only target found in shadow root',
      },
      {
        result: true,
        actual: 'real target',
        expected: 'real target',
        message: 'Target element text',
      },
    ]);
  });
});
