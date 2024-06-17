// QUnit's package.json needs updating, because this is silly
import 'qunit/qunit/qunit.css';
import * as QUnit from 'qunit';
// Setup the package that this repo provides
import { setup, DOMAssertionsHandler, type RootElement, type FoundElement } from 'qunit-dom';

QUnit.config.autostart = false;

class CustomHandler extends DOMAssertionsHandler<number> {
  findElements(target: number, rootElement: RootElement): FoundElement[] {
    if (typeof target === 'number' && rootElement) {
      return Array.prototype.slice.call(rootElement.querySelectorAll(`[data-id="${target}"]`), 0);
    }
    return [null];
  }

  findElement(target: number, rootElement: RootElement): FoundElement {
    if (typeof target === 'number' && rootElement) {
      return rootElement.querySelector(`[data-id="${target}"]`);
    }
    return null;
  }

  description(target: number): string {
    if (target >= 200) {
      return  `data-id=${target}` ;
    } else if (target <= 100) {
      return target.toString();
    } else {
      return "<not found>";
    }
  }
}

setup<CustomHandler>(QUnit.assert, {
  targetHandler: new CustomHandler(),
});

const modules = import.meta.glob('./tests/*', { eager: true });

console.log({ modules });

QUnit.start();

