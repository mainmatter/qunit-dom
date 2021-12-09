'use strict';
/* eslint-env node */

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      {
        // this is currently the version in package.json, so no dependency changes are needed
        name: 'ember-qunit-4',
        npm: {
          devDependencies: {
            'ember-qunit': '^4.0.0',
            'ember-source': '~3.28.0',
            '@ember/test-helpers': null,
            qunit: null,
          },
        },
      },
      {
        name: 'ember-qunit-5',
        npm: {
          devDependencies: {
            'ember-qunit': '^5.0.0-beta.4',
            '@ember/test-helpers': '^2.0.0-beta.6',
            qunit: '^2.11.0',
          },
        },
      },
      {
        name: 'ember-lts-3.28',
        npm: {
          devDependencies: {
            'ember-source': '~3.28.0',
          },
        },
      },
    ],
  };
};
