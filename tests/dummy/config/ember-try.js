'use strict';
/* eslint-env node */

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      {
        // this is currently the version in package.json, so no dependency changes are needed
        name: 'ember-qunit-4',
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
    ],
  };
};
