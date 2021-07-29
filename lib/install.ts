import DOMAssertions, { DOMAssertionOptions } from './assertions';
import { getRootElement } from './root-element';

export interface InstallOptions extends DOMAssertionOptions {}

export default function (assert: Assert, options: InstallOptions = {}) {
  assert.dom = function (
    target?: string | Element | null,
    rootElement?: Element,
    options: DOMAssertionOptions = {}
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    if (arguments.length === 0) {
      target = rootElement instanceof Element ? rootElement : null;
    }

    return new DOMAssertions(target, rootElement, this, options);
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
