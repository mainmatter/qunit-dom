import DOMAssertions from './assertions';

declare global {
  interface Assert {
    dom(target?: string | Element, rootElement?: Element): DOMAssertions;
  }
}

QUnit.assert.dom = function(target, rootElement) {
  rootElement = rootElement || this.dom.rootElement || document;
  return new DOMAssertions(target || rootElement, rootElement, this);
};
