import elementToString from './helpers/element-to-string';
import { toArray } from './helpers/node-list';

/**
 * An interface for external query implementations, allowing `qunit-dom` to run
 * assertions on objects wrapping DOM elements/queries such as page object
 * implementations.
 *
 * At a minimum, implementations must provide the `elements` property, and
 * `qunit-dom` can fill in the other functionality with reasonable
 * assumptions/defaults.
 *
 * Example:
 *
 * ```javascript
 * function withText(selector, text) {
 *   let els = Array.from(document.querySelectorAll(selector));
 *   return {
 *     elements: els.filter(e => e.textContent.includes('submit')),
 *     elementsDescription: `${selector}:contains(${text})`
 *   };
 * }
 *
 * assert.dom(withText('button', 'save')).exists();
 * ```
 */
export interface ExternalQuery {
  /**
   * The DOM elements matched when executing this query as a multiple-element
   * query, analagous to `querySelectorAll()`
   */
  elements: NodeListOf<Element> | Element[];
  /**
   * The DOM element (or null) matched when executing this query as a
   * single-element query, analagous to `querySelector()`. If not supplied, the
   * value will default to `elements[0]`. This property can be implemented to
   * achieve better performance since almost all of `qunit-dom`'s assertions run
   * single-element queries.
   */
  element?: Element | null;
  /**
   * A string describing the matched elements, e.g. the selector used to query
   * them. If not supplied, then `qunit-dom` will generate a description by
   * inspecting the first matching element and reading various properties and
   * attributes off of it.
   */
  elementsDescription?: string;
}

/**
 * An internal interface for querying the DOM for a single element or a list of
 * elements (abstracts out the various types of arguments that can be passed to
 * DOMAssertions' constructor)
 *
 * @private
 */
export interface DOMQuery {
  /**
   * The DOM elements matched when executing this query as a multiple-element
   * query, analagous to `querySelectorAll()`
   */
  elements: Element[];
  /**
   * The DOM element (or null) matched when executing this query as a
   * single-element query, analagous to `querySelector()`
   */
  element: Element | null;
  /**
   * A string describing the matched elements, e.g. the selector used to query
   * them
   */
  description: string;
  /**
   * A prose string describing how these elements were selected, e.g. `selected
   * by <selector>`
   */
  selectedBy: string;
}

/**
 * A selector-based query, made using a root element and selector string
 *
 * @private
 */
class SelectorQuery implements DOMQuery {
  constructor(public selector: string, private rootElement: Element | Document) {}

  get element() {
    return this.rootElement.querySelector(this.selector);
  }

  get elements() {
    return toArray(this.rootElement.querySelectorAll(this.selector));
  }

  get description() {
    return elementToString(this.selector);
  }

  get selectedBy() {
    return `selected by ${this.selector}`;
  }
}

/**
 * A query wrapping a single element
 *
 * @private
 */
class ElementQuery implements DOMQuery {
  constructor(public element: Element | null) {}

  get elements() {
    return this.element ? [this.element] : [];
  }

  get description() {
    return elementToString(this.element);
  }

  selectedBy = 'passed';
}

/**
 * A query wrapping an ExternalQuery
 *
 * @private
 */
class WrappedQuery implements DOMQuery {
  constructor(private wrapped: ExternalQuery) {}

  get element() {
    if (Reflect.has(this.wrapped, 'element')) {
      return Reflect.get(this.wrapped, 'element') || null;
    } else {
      return this.elements[0] || null;
    }
  }

  get elements() {
    let elements = this.wrapped.elements;
    if (elements instanceof NodeList) {
      return toArray(elements);
    } else {
      return elements;
    }
  }

  get description() {
    if (Reflect.has(this.wrapped, 'elementsDescription')) {
      return Reflect.get(this.wrapped, 'elementsDescription');
    } else {
      return elementToString(this.element);
    }
  }

  get selectedBy() {
    if (Reflect.has(this.wrapped, 'elementsDescription')) {
      return `selected by ${Reflect.get(this.wrapped, 'elementsDescription')}`;
    } else {
      return 'passed';
    }
  }
}

/**
 * Helper to determine if an argument looks like an ExternalQuery, i.e. has an
 * `elements` property. This exists for safe detection for Javascript users that
 * don't have type checking.
 *
 * @private
 */
function isExternalQuery(arg: any) {
  try {
    return Reflect.has(arg, 'elements');
  } catch (e) {
    return false;
  }
}

/**
 * Create a DOMQuery from various types of arguments
 *
 * @private
 */
export function createQuery(
  target: string | Element | null | ExternalQuery,
  rootElement: Element | Document
): DOMQuery {
  if (target === null) {
    return new ElementQuery(null);
  } else if (typeof target === 'string') {
    return new SelectorQuery(target, rootElement);
  } else if (target instanceof Element) {
    return new ElementQuery(target);
  } else if (isExternalQuery(target)) {
    return new WrappedQuery(target);
  } else {
    throw new TypeError(`Unexpected Parameter: ${target}`);
  }
}
