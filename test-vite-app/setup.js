// QUnit's package.json needs updating, because this is silly
import 'qunit/qunit/qunit.css';
import * as QUnit from 'qunit/qunit/qunit.js';

// Setup the package that this repo provides
import { setup } from 'qunit-dom';

QUnit.config.autostart = false;

console.log('setting up');
setup(QUnit.assert);


const modules = import.meta.glob('./tests/*', { eager: true });

console.log({ modules });

QUnit.start();

