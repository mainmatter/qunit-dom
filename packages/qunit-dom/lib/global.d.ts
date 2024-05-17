import DOMAssertions, { RootElement } from './assertions.js';

declare global {
  type QUnitDOMAssertTarget = string | Element | null;

  // overwrite the global QUnit interface
  interface Assert {
    dom(target?: QUnitDOMAssertTarget, rootElement?: RootElement): DOMAssertions;
  }
}
