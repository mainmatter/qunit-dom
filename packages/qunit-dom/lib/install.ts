import DOMAssertions, { DOMAssertionsHandler, type RootElement } from './assertions.js';
import { getRootElement } from './root-element.js';

export default function <Target>(assert: Assert, targetHandler: DOMAssertionsHandler<Target>) {
  assert.dom = function AssertDom(
    target: Target,
    rootElement?: RootElement
  ): DOMAssertions<Target> {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();
    if (target === undefined || target === null) {
      target = (rootElement instanceof Element ? rootElement : null) as Target;
    }
    return new DOMAssertions(target, rootElement, this, targetHandler);
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
