import { module, test } from 'qunit';

module('custom assert.dom(...) handlers', (hooks) => {
  hooks.beforeEach(() => {
    document.body.innerHTML = `<input class="input username" />
    <div data-id="100">I'm flexible</div>`;
    (document.querySelector('input.username') as HTMLInputElement).value = 'HSimpson';
  });

  test('works', (assert) => {
    // @ts-expect-error
    assert.dom('input.username').hasAnyValue('custom message');
    assert.dom(100).hasText('I\'m flexible', 'custom message');
  });
});
