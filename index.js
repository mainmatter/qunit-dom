/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'qunit-dom',

  init() {
    this._super.init.apply(this, arguments);

    const VersionChecker = require('ember-cli-version-checker');
    const checker = new VersionChecker(this.project);
    this._supportOlderEmberQUnit = !checker.for('ember-qunit').gte('5.0.0-alpha.1');
  },

  included() {
    this._super.included.apply(this, arguments);

    if (this._supportOlderEmberQUnit) {
      this.import('vendor/qunit-dom.js', { type: 'test' });
      this.import('vendor/overwrite-qunit-dom-root-element.js', { type: 'test' });
    }
  },

  treeForVendor(vendorTree) {
    if (this._supportOlderEmberQUnit) {
      let qunitPluginTree = new Funnel(`${__dirname}/dist`, {
        files: ['qunit-dom.js', 'qunit-dom.js.map'],
      });

      return new MergeTrees([vendorTree, qunitPluginTree]);
    }
  },

  treeForAddonTestSupport() {
    if (this._supportOlderEmberQUnit) {
      return new Funnel(`${__dirname}/vendor`, {
        files: ['dummy-module.js'],
        getDestinationPath() {
          return 'qunit-dom/index.js';
        },
      });
    } else {
      // this differs from ember-cli's default treeForAddonTestSupport in that it
      // makes our test support modules available at `qunit-dom` **not**
      // `qunit-dom/test-suppprt`
      let scopedInputTree = new Funnel(`${__dirname}/dist/addon-test-support`, {
        destDir: 'qunit-dom',
      });

      // in order to take advantage of ember-auto-import, we **must** use
      // `preprocessJs` (because it instruments JS files looking for imports
      // via the preprocessor registry)
      //
      // this also properly transpiles our files based on the consuming applications
      // targets (through ember-cli-babel)
      return this.preprocessJs(scopedInputTree, '/', this.name, {
        annotation: `qunit-dom - treeForAddonTestSupport`,
        registry: this.registry,
      });
    }
  },
};
