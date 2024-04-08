import { describe, beforeEach, test, expect } from 'vitest';
import TestAssertions from '../helpers/test-assertions';
import { toArray } from '../helpers/node-list';

const customHandler: DOMAssertionsHandler<u32> = {
  name: 'test-handler',

  findElements(target: u32, rootElement: RootElement) {
    if (typeof target === 'number') {
      return { ok: true, value: toArray(rootElement.querySelectorAll(`[data-id="${target}"]`)) };
    }
    return { ok: false, value: null };
  },

  findElement(target: u32, rootElement: RootElement) {
    if (typeof target === 'number') {
      return { ok: true, value: rootElement.querySelector(`[data-id="${target}"]`) };
    }
    return { ok: false, value: null };
  },

  description(target: u32) {
    if (target >= 200) {
      return { ok: true, value: `data-id=${target}` };
    } else if (target <= 100) {
      return { ok: true, value: target };
    } else {
      return { ok: false, value: null };
    }
  },
};

describe('custom assert.dom(...) handlers', () => {
  let assert: TestAssertions;

  beforeEach(() => {
    assert = new TestAssertions([customHandler]);

    document.body.innerHTML = `<input class="input username" />
    <div data-id="100">I'm flexible</div>
    <button data-id="100">A</button>
    <button data-id="201">B</button>`;
    (document.querySelector('input.username') as HTMLInputElement).value = 'HSimpson';
  });

  test('assert.dom provided a custom handler doesnt change original behaviour', () => {
    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(document.querySelector('input.username')).hasAnyValue('custom message');

    expect(assert.results).toEqual([
      {
        actual: 'Element input.username has a value',
        expected: 'Element input.username has a value',
        message: 'custom message',
        result: true,
      },
      {
        actual: 'Element input.input.username has a value',
        expected: 'Element input.input.username has a value',
        message: 'custom message',
        result: true,
      },
    ]);
  });

  test('custom assert.dom finds an element with data-id', () => {
    assert.dom(100).hasText("I'm flexible");

    expect(assert.results).toEqual([
      {
        actual: "I'm flexible",
        expected: "I'm flexible",
        message: 'Element 100 has text "I\'m flexible"',
        result: true,
      },
    ]);
  });

  test('custom assert.dom finds an element and allows for custom message', () => {
    assert.dom(100).hasText("I'm flexible", 'custom message');

    expect(assert.results).toEqual([
      {
        actual: "I'm flexible",
        expected: "I'm flexible",
        message: 'custom message',
        result: true,
      },
    ]);
  });

  test('custom assert.dom handles multiple element assertions', () => {
    assert.dom(100).exists();
    assert.dom(100).isVisible();

    expect(assert.results).toEqual([
      {
        actual: 'Element 100 exists',
        expected: 'Element 100 exists',
        message: 'Element 100 exists',
        result: true,
      },
      {
        actual: 'Element 100 is not visible',
        expected: 'Element 100 is visible',
        message: 'Element 100 is visible',
        result: false,
      },
    ]);
  });

  test('custom assert.dom handles custom description message', () => {
    assert.dom(201).hasAttribute('data-id', '201');

    expect(assert.results).toEqual([
      {
        actual: 'Element data-id=201 has attribute "data-id" with value "201"',
        expected: 'Element data-id=201 has attribute "data-id" with value "201"',
        message: 'Element data-id=201 has attribute "data-id" with value "201"',
        result: true,
      },
    ]);
  });
});
