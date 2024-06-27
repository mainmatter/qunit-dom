import { describe, beforeEach, test, expect } from 'vitest';

import createDescriptor from '../descriptor';
import TestAssertions from '../helpers/test-assertions';
import {
  resolveDOMElement,
  resolveDOMElements,
  resolveDescription,
  createDescriptor as createDescriptorBase,
} from 'dom-element-descriptors';

describe('createQuery()', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div class="single"></div><div class="multiple"></div><div class="multiple"></div>';
  });

  test('it works with a selector', () => {
    let expected = Array.from(document.querySelectorAll('.multiple'));
    let descriptor = createDescriptor('.multiple', document);

    expect(resolveDOMElement(descriptor)).toEqual(expected[0]);
    expect(resolveDOMElements(descriptor)).toEqual(expected);
    expect(resolveDescription(descriptor)).toEqual('.multiple');
  });

  test('selector respects the root element', () => {
    document.body.innerHTML =
      '<div class="multiple"><div class="root"><div class="multiple"></div></div>';
    let root = document.querySelector('.root');
    let [outOfRoot, inRoot] = Array.from(document.querySelectorAll('.multiple'));

    expect(resolveDOMElement(createDescriptor('.multiple', document))).toEqual(outOfRoot);
    expect(resolveDOMElements(createDescriptor('.multiple', document))).toEqual([
      outOfRoot,
      inRoot,
    ]);

    expect(resolveDOMElement(createDescriptor('.multiple', root))).toEqual(inRoot);
    expect(resolveDOMElements(createDescriptor('.multiple', root))).toEqual([inRoot]);
  });

  test('it works with an element', () => {
    let expected = document.querySelector('.multiple');
    let descriptor = createDescriptor(expected, document);

    expect(resolveDOMElement(descriptor)).toEqual(expected);
    expect(resolveDOMElements(descriptor)).toEqual([expected]);
    expect(resolveDescription(descriptor)).toEqual('div.multiple');
  });

  test('it works with null', () => {
    let descriptor = createDescriptor(null, document);

    expect(resolveDOMElement(descriptor)).toEqual(null);
    expect(resolveDOMElements(descriptor)).toEqual([]);
    expect(resolveDescription(descriptor)).toEqual('<unknown>');
  });

  test('it works with a dom element descriptor', () => {
    let expected = Array.from(document.querySelectorAll('.multiple'));
    let descriptor = createDescriptor(
      createDescriptorBase({ elements: expected, description: 'descriptoriffic' }),
      document
    );

    expect(resolveDOMElement(descriptor)).toEqual(expected[0]);
    expect(resolveDOMElements(descriptor)).toEqual(expected);
    expect(resolveDescription(descriptor)).toEqual('descriptoriffic');
  });

  test('it works via assert.dom()', () => {
    let assert = new TestAssertions();

    assert
      .dom(createDescriptorBase({ elements: Array.from(document.querySelectorAll('.single')) }))
      .exists({ count: 1 });
    assert
      .dom(createDescriptorBase({ elements: Array.from(document.querySelectorAll('.multiple')) }))
      .exists({ count: 2 });
    assert
      .dom(createDescriptorBase({ elements: Array.from(document.querySelectorAll('.single')) }))
      .hasTagName('div');

    expect(assert.results).toEqual([
      {
        actual: 'Element undefined exists once',
        expected: 'Element undefined exists once',
        message: 'Element undefined exists once',
        result: true,
      },
      {
        actual: 'Element undefined exists twice',
        expected: 'Element undefined exists twice',
        message: 'Element undefined exists twice',
        result: true,
      },
      {
        actual: 'div',
        expected: 'div',
        message: 'Element undefined has tagName div',
        result: true,
      },
    ]);
  });

  test('throws for unexpected parameter types', () => {
    expect(() => createDescriptor(5, document)).toThrow('Unexpected Parameter: 5');
    expect(() => createDescriptor(true, document)).toThrow('Unexpected Parameter: true');
    expect(() => createDescriptor(undefined, document)).toThrow('Unexpected Parameter: undefined');
    expect(() => createDescriptor({}, document)).toThrow('Unexpected Parameter: [object Object]');
    expect(() => createDescriptor({ element: document.createElement('div') }, document)).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    expect(() => createDescriptor(document, document)).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
