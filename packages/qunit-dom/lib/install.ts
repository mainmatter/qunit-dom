import DOMAssertions from './assertions.js';
import { getRootElement } from './root-element.js';

declare global {
  type RootElement = Element | Document | ShadowRoot | null;

  interface Assert {
    dom(target?: string | Element | null, rootElement?: RootElement): DOMAssertions;
  }
}

export default function (assert: Assert) {
  assert.dom = function (
    target?: string | Element | null,
    rootElement?: RootElement
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    return new DOMAssertions(
      target !== undefined ? target : rootElement instanceof Element ? rootElement : null,
      rootElement,
      this
    );
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
