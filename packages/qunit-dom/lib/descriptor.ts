import {
  type IDOMElementDescriptor,
  isDescriptor,
  createDescriptor as create,
} from 'dom-element-descriptors';
import elementToString from './helpers/element-to-string';

/**
 * Descriptor data for creating an {@link IDOMElementDescriptor} from a CSS
 * selector
 */
class SelectorData {
  constructor(
    private readonly selector: string,
    private readonly rootElement: Element | Document
  ) {}

  get element() {
    return this.rootElement.querySelector(this.selector);
  }

  get elements() {
    return Array.from(this.rootElement.querySelectorAll(this.selector));
  }

  get description() {
    return this.selector;
  }
}

/**
 * Descriptor data for creating an {@link IDOMElementDescriptor} from an
 * {@link Element}
 */
class ElementData {
  constructor(public readonly element: Element) {}

  get description() {
    return elementToString(this.element);
  }
}

/**
 * Create an {@link IDOMElementDescriptor} from a target and a root element
 */
export default function createDescriptor(
  target: string | Element | null | IDOMElementDescriptor,
  rootElement: Element | Document
): IDOMElementDescriptor {
  if (typeof target === 'string') {
    // selector
    return create(new SelectorData(target, rootElement));
  } else if (target instanceof Element) {
    // element
    return create(new ElementData(target));
  } else if (target === null) {
    // null, which we treat as an unmatched element, e.g.
    // `createDescriptor(document.querySelector('.does-not-exist'))`
    return create({ element: null, description: '<not found>' });
  } else if (isDescriptor(target)) {
    // already a descriptor
    return target;
  } else {
    throw new TypeError(`Unexpected Parameter: ${target}`);
  }
}
