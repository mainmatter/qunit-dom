import install, { InstallOptions } from './install';
import { overrideRootElement } from './root-element';

export { default as install } from './install';

interface SetupOptions extends InstallOptions {
  getRootElement?: () => Element | null;
}

export function setup(assert: Assert, options: SetupOptions = {}) {
  install(assert, options);

  const getRootElement =
    typeof options.getRootElement === 'function'
      ? options.getRootElement
      : () => document.querySelector('#ember-testing');

  overrideRootElement(getRootElement);
}
