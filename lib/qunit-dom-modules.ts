import * as QUnit from 'qunit';
import attach from './install';
import { overrideRootElement } from './root-element';

export { default as attach } from './install';

interface SetupOptions {
  getRootElement?: () => Element | null;
}

export function setup(options: SetupOptions) {
  attach(QUnit.assert);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
