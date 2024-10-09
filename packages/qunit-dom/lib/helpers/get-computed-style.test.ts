import { describe, beforeEach, test, expect, vi } from 'vitest';

import getComputedStyle from './get-computed-style';

describe('getComputedStyle', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('when computedStyleMap() is supported', () => {
    Element.prototype.computedStyleMap = vi.fn().mockReturnValue(new Map([['width', '100px']]));

    const element = document.createElement('div');
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(computedStyle).toHaveProperty('width', '100px');
  });

  test('when computedStyleMap() is not supported', () => {
    const element = document.createElement('div');
    element.style.width = '100px';
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(computedStyle).toHaveProperty('width', '100px');
  });

  test('kebab-case properties', () => {
    const element = document.createElement('div');
    element.style.textAlign = 'center';
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(computedStyle).toHaveProperty('text-align', 'center');
  });

  test('camelCase properties', () => {
    const element = document.createElement('div');
    element.style.textAlign = 'center';
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(computedStyle).toHaveProperty('textAlign', 'center');
  });

  test('iterating over StylePropertyMap properties', () => {
    Element.prototype.computedStyleMap = vi.fn().mockReturnValue(
      new Map([
        ['height', '200px'],
        ['width', '100px'],
      ])
    );

    const element = document.createElement('div');
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(Object.keys(computedStyle)).toEqual(['height', 'width']);
  });

  test('iterating over CSSStyleDeclaration properties', () => {
    const element = document.createElement('div');
    element.style.height = '200px';
    element.style.width = '100px';
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(Object.keys(computedStyle)).toEqual(expect.arrayContaining(['0', '1', '2', '3']));
  });

  test('the existence of a StylePropertyMap property', () => {
    const element = document.createElement('div');
    element.style.textAlign = '200px';
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(Reflect.has(computedStyle, 'text-align')).toBe(true);
  });

  test('the existence of a CSSStyleDeclaration property', () => {
    Element.prototype.computedStyleMap = vi
      .fn()
      .mockReturnValue(new Map([['text-align', 'center']]));

    const element = document.createElement('div');
    document.body.appendChild(element);

    const computedStyle = getComputedStyle(element);
    expect(Reflect.has(computedStyle, 'text-align')).toBe(true);
  });
});
