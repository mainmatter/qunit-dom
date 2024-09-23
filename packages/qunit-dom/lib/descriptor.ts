import {
  type IDOMElementDescriptor,
  isDescriptor,
  createDescriptor as create,
} from 'dom-element-descriptors';
import elementToString from './helpers/element-to-string';

/**
 * @ignore
 * Descriptor data for creating an {@link IDOMElementDescriptor} from a CSS
 * selector
 */
class SelectorData {
  constructor(
    private readonly selector: string,
    private readonly rootElement: NonNullable<RootElement>
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
 * @ignore
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
 * @ignore
 * Create an {@link IDOMElementDescriptor} from a target and a root element
 */
export default function createDescriptor(
  target: string | Element | null | IDOMElementDescriptor,
  rootElement: RootElement
): IDOMElementDescriptor {
  if (typeof target === 'string') {
    // selector
    if (!rootElement) {
      throw new Error('Cannot do selector-based queries without a root element');
    }
    return create(new SelectorData(target, rootElement));
  } else if (target instanceof Element) {
    // element
    return create(new ElementData(target));
  } else if (target === null) {
    // null, which we treat as an unmatched element, e.g.
    // `createDescriptor(document.querySelector('.does-not-exist'))`
    return create({ element: null, description: '<unknown>' });
  } else if (isDescriptor(target)) {
    // already a descriptor
    return target;
  } else {
    throw new TypeError(`Unexpected Parameter: ${target}`);
  }
}
