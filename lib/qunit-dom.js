import DOMAssertions from './assertions';

QUnit.assert.dom = function(target, rootElement) {
  rootElement = rootElement || this.dom.rootElement || document;
  return new DOMAssertions(target || rootElement, rootElement, this);
};
