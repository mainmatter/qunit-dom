import DOMAssertions from './assertions';

declare global {
  interface Assert {
    dom(target?: string | Element | null, rootElement?: Element): DOMAssertions;
  }
}

QUnit.assert.dom = function(target?: string | Element | null, rootElement?: Element): DOMAssertions {
  rootElement = rootElement || this.dom.rootElement || document;
  return new DOMAssertions(target || rootElement, rootElement, this);
};
