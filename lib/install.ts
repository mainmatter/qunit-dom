import DOMAssertions from './assertions';
import type { ExternalQuery } from './query';
import { getRootElement } from './root-element';

export default function (assert: Assert) {
  assert.dom = function (
    target?: string | Element | null | ExternalQuery,
    rootElement?: Element
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    if (arguments.length === 0) {
      target = rootElement instanceof Element ? rootElement : null;
    }

    return new DOMAssertions(target, rootElement, this);
  };

  function isValidRootElement(element: any): element is Element {
    return (
      !element ||
      (typeof element === 'object' &&
        typeof element.querySelector === 'function' &&
        typeof element.querySelectorAll === 'function')
    );
  }
}
