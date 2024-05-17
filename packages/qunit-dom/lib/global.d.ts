import DOMAssertions from './assertions.js';

export {};

declare global {
  type QUnitDOMAssertTarget = string | Element | null;
  type RootElement = Element | Document | ShadowRoot | null;

  // overwrite the global QUnit interface
  interface Assert {
    dom(target?: QUnitDOMAssertTarget, rootElement?: RootElement): DOMAssertions;
  }
}
