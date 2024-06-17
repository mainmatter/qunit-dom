import DOMAssertions, {
  DOMAssertionsHandler,
  type AssertionHandler,
  type RootElement,
} from './assertions.js';
import { getRootElement } from './root-element.js';

export default function (assert: Assert, targetHandler?: AssertionHandler) {
  assert.dom = function (target?: QUnitDOMAssertTarget, rootElement?: RootElement): DOMAssertions {
    if (!isValidRootElement(rootElement)) {
      throw new Error(`${rootElement} is not a valid root element`);
    }

    rootElement = rootElement || this.dom.rootElement || getRootElement();

    const _targetHandler = targetHandler || new DOMAssertionsHandler();
    return new DOMAssertions(
      target !== undefined ? target : rootElement instanceof Element ? rootElement : null,
      rootElement,
      this,
      _targetHandler
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
