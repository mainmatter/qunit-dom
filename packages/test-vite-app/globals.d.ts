import DOMAssertions from "qunit-dom";

export {};

declare global {
  type QUnitDOMAssertTarget = number;

  interface Assert {
    dom(target?: QUnitDOMAssertTarget, rootElement?: Element): DOMAssertions;
  }
}

