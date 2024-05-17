import { module, test } from 'qunit';
import { expectTypeOf } from 'expect-type'

module('custom assert.dom(...) handlers', (hooks) => {
  hooks.beforeEach(() => {
    document.body.innerHTML = `<input class="input username" />
    <div data-id="100">I'm flexible</div>`;
    (document.querySelector('input.username') as HTMLInputElement).value = 'HSimpson';
  });

  test('works', (assert) => {
    expectTypeOf(assert.dom).parameter(0).toEqualTypeOf<number | undefined>(100);
    assert.dom(100).hasText('I\'m flexible', 'custom message');
    
    // @ts-expect-error
    assert.dom('input.username').hasAnyValue('custom message');
    expectTypeOf(assert.dom).parameter(0).not.toEqualTypeOf<undefined | null>();
    expectTypeOf(assert.dom).parameter(0).not.toEqualTypeOf<string>("a");
    expectTypeOf(assert.dom).parameter(0).not.toEqualTypeOf<string | Element | null>("a");
  });
});
