import DOMAssertions from './assertions.js';
import { getRootElement } from './root-element.js';
import type { IDOMElementDescriptor } from 'dom-element-descriptors';

type TRoot = Element | Document | ShadowRoot | null;

interface IAssert {
  dom(target?: DOMTarget, rootElement?: RootElement): DOMAssertions;
}

export type RootElement = TRoot;
export type Assert = IAssert;
export type DOMTarget = string | Element | IDOMElementDescriptor | null;

declare global {
  type RootElement = TRoot;
  interface Assert extends IAssert {}
}

export default function (assert: Assert) {
  assert.dom = function (target?: DOMTarget, rootElement?: RootElement): DOMAssertions {
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
