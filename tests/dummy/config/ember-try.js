'use strict';
/* eslint-env node */

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
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
        name: 'embroider-ember-qunit-4',
        npm: {
          devDependencies: {
            '@embroider/core': 'latest',
            '@embroider/webpack': 'latest',
            '@embroider/compat': 'latest',
          },
        },
      },
      {
        name: 'embroider-ember-qunit-5',
        npm: {
          devDependencies: {
            '@ember/test-helpers': '^2.0.0-beta.6',
            '@embroider/core': 'latest',
            '@embroider/webpack': 'latest',
            '@embroider/compat': 'latest',
            'ember-qunit': '^5.0.0-beta.4',
            qunit: '^2.11.0',
          },
        },
      },
    ],
  };
};
