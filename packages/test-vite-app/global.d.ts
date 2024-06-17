import DOMAssertions from "qunit-dom";

declare global {
  type RootElement = Element | Document | ShadowRoot | null;
  interface Assert {
    dom(target?: number, rootElement?: RootElement): DOMAssertions<number>;
  }
}
