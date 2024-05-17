import DOMAssertions from './assertions.js';

export {};

declare global {
  type QUnitDOMAssertTarget = string | Element | null;

  // overwrite the global QUnit interface
  interface Assert {
    dom(target?: QUnitDOMAssertTarget, rootElement?: Element): DOMAssertions;
  }
}

