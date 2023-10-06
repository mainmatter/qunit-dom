/* eslint-env node */
'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: 'qunit-dom',

  treeForAddonTestSupport() {
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
  },
};
