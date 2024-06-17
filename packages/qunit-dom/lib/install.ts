import DOMAssertions, { DOMAssertionsHandler, type RootElement } from './assertions.js';
import { getRootElement } from './root-element.js';

export interface ConstructableHandler {
  new (...args: any[]): DOMAssertionsHandler;
}

declare global {
  interface Assert {
    dom(target?: string | Element | null, rootElement?: RootElement): DOMAssertions;
  }
}

export default function Install<AssertionHandler extends ConstructableHandler>(
  assert: Assert,
  TargetHandler: AssertionHandler
) {
  assert.dom = function AssertDom(
    target: string | Element | null,
    rootElement?: RootElement
  ): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();
    target = target !== undefined ? target : rootElement instanceof Element ? rootElement : null;
    return new DOMAssertions(rootElement, this, new TargetHandler(target));
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
