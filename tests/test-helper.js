import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';
import * as QUnit from 'qunit';

import { dependencySatisfies, importSync } from '@embroider/macros';

if (dependencySatisfies('ember-qunit', '>= 5.0.0-beta.1')) {
  const { setup } = importSync('qunit-dom');

  setup(QUnit.assert);
}

setApplication(Application.create(config.APP));

start();
