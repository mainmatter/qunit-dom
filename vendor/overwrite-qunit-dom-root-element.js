Object.defineProperty(QUnit.assert.dom, 'rootElement', {
  get: function() {
    return document.querySelector('#ember-testing > .ember-view') || document.querySelector('#ember-testing');
  },
  enumerable: true,
  configurable: true,
});
