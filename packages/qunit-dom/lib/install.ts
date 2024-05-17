import DOMAssertions, { DOMAssertionsHandler, type AssertionHandler } from './assertions.js';
import { getRootElement } from './root-element.js';

export default function (assert: Assert, targetHandler?: AssertionHandler) {
  assert.dom = function (target?: string | Element | null, rootElement?: Element): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    if (arguments.length === 0) {
      target = rootElement instanceof Element ? rootElement : null;
    }

    const _targetHandler = targetHandler || new DOMAssertionsHandler();
    return new DOMAssertions(target, rootElement, this, _targetHandler);
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
