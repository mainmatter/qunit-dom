/* eslint-env jest */

import { createQuery } from '../query';
import TestAssertions from '../helpers/test-assertions';

describe('createQuery()', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div class="single"></div><div class="multiple"></div><div class="multiple"></div>';
  });

  describe('element/elements', () => {
    test('single element matching', () => {
      let selector = createQuery('.single', document);
      let element = createQuery(document.querySelector('.single'), document);
      let wrapper = createQuery({ elements: [document.querySelector('.single')] }, document);

      let expected = document.querySelector('.single');

      expect(selector.element).toEqual(expected);
      expect(element.element).toEqual(expected);
      expect(wrapper.element).toEqual(expected);

      expect(selector.elements).toEqual([expected]);
      expect(element.elements).toEqual([expected]);
      expect(wrapper.elements).toEqual([expected]);
    });

    test('multiple element matching', () => {
      let selector = createQuery('.multiple', document);
      // No equivalent for element query
      let wrapper = createQuery(
        { elements: Array.from(document.querySelectorAll('.multiple')) },
        document
      );

      let expected = Array.from(document.querySelectorAll('.multiple'));

      expect(selector.element).toEqual(expected[0]);
      expect(wrapper.element).toEqual(expected[0]);

      expect(selector.elements).toEqual(expected);
      expect(wrapper.elements).toEqual(expected);
    });

    test('no element matching', () => {
      let selector = createQuery('.none', document);
      let element = createQuery(document.querySelector('.none'), document);
      let wrapper = createQuery(
        { elements: Array.from(document.querySelectorAll('.none')) },
        document
      );

      expect(selector.element).toEqual(null);
      expect(element.element).toEqual(null);
      expect(wrapper.element).toEqual(null);

      expect(selector.elements).toEqual([]);
      expect(element.elements).toEqual([]);
      expect(wrapper.elements).toEqual([]);
    });
  });

  describe('display strings', () => {
    test('selector', () => {
      let single = createQuery('.single', document);
      let multiple = createQuery('.multiple', document);
      let none = createQuery('.none', document);

      expect(single.description).toEqual('.single');
      expect(multiple.description).toEqual('.multiple');
      expect(none.description).toEqual('.none');

      expect(single.selectedBy).toEqual('selected by .single');
      expect(multiple.selectedBy).toEqual('selected by .multiple');
      expect(none.selectedBy).toEqual('selected by .none');
    });

    test('element', () => {
      let single = createQuery(document.querySelector('.single'), document);
      let none = createQuery(document.querySelector('.none'), document);

      expect(single.description).toEqual('div.single');
      expect(none.description).toEqual('<not found>');

      expect(single.selectedBy).toEqual('passed');
      expect(none.selectedBy).toEqual('passed');
    });

    test('wrapped', () => {
      let single = createQuery({ elements: [document.querySelector('.single')] }, document);
      let multiple = createQuery({ elements: [document.querySelector('.multiple')] }, document);
      let none = createQuery({ elements: [document.querySelector('.none')] }, document);

      expect(single.description).toEqual('div.single');
      expect(multiple.description).toEqual('div.multiple');
      expect(none.description).toEqual('<not found>');

      expect(single.selectedBy).toEqual('passed');
      expect(multiple.selectedBy).toEqual('passed');
      expect(none.selectedBy).toEqual('passed');
    });
  });

  describe('root element', () => {
    let root: Element;
    let inRoot: Element;
    let outOfRoot: Element;

    beforeEach(() => {
      document.body.innerHTML =
        '<div class="root"><div class="multiple"></div></div><div class="multiple">';
      root = document.querySelector('.root');
      [inRoot, outOfRoot] = Array.from(document.querySelectorAll('.multiple'));
    });

    test('selector query respects root', () => {
      expect(createQuery('.multiple', root).elements).toEqual([inRoot]);
    });

    test('element query ignores root', () => {
      expect(createQuery(outOfRoot, root).elements).toEqual([outOfRoot]);
    });

    test('wrapped query ignores root', () => {
      expect(createQuery({ elements: [inRoot, outOfRoot] }, root).elements).toEqual([
        inRoot,
        outOfRoot,
      ]);
    });
  });

  describe('wrapped query', () => {
    test('elements can be a NodeList', () => {
      let wrapped = createQuery(
        {
          elements: document.querySelectorAll('.multiple'),
        },
        document
      );

      expect(wrapped.elements).toEqual(Array.from(document.querySelectorAll('.multiple')));
    });

    test('it can explicitly define element (performance optimization)', () => {
      let wrapped = createQuery(
        {
          element: document.querySelector('.single'),
          elements: Array.from(document.querySelectorAll('.multiple')),
        },
        document
      );

      expect(wrapped.element).toEqual(document.querySelector('.single'));
      expect(wrapped.elements).toEqual(Array.from(document.querySelectorAll('.multiple')));
    });

    test('it can define elementsDescription', () => {
      let wrapped = createQuery(
        {
          elements: Array.from(document.querySelectorAll('.multiple')),
          elementsDescription: 'all the elements',
        },
        document
      );

      expect(wrapped.description).toEqual('all the elements');
      expect(wrapped.selectedBy).toEqual('selected by all the elements');
    });

    test('it works via assert.dom()', () => {
      let assert = new TestAssertions();

      assert.dom({ elements: document.querySelectorAll('.single') }).exists({ count: 1 });
      assert.dom({ elements: document.querySelectorAll('.multiple') }).exists({ count: 2 });
      assert.dom({ elements: document.querySelectorAll('.single') }).hasTagName('div');
    });
  });

  test('throws for unexpected parameter types', () => {
    //@ts-ignore -- These assertions are for JavaScript users who don't have type checking
    expect(() => createQuery(5, document).toThrow('Unexpected Parameter: 5'));
    //@ts-ignore
    expect(() => createQuery(true, document)).toThrow('Unexpected Parameter: true');
    expect(() => createQuery(undefined, document)).toThrow('Unexpected Parameter: undefined');
    //@ts-ignore
    expect(() => createQuery({}, document)).toThrow('Unexpected Parameter: [object Object]');
    //@ts-ignore
    expect(() => createQuery({ element: document.createElement('div') }, document)).toThrow(
      'Unexpected Parameter: [object Object]'
    );
    //@ts-ignore
    expect(() => createQuery(document, document)).toThrow(
      'Unexpected Parameter: [object Document]'
    );
  });
});
