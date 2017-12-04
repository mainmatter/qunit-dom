import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('root-element', 'Integration | root element', {
  integration: true
});

test('it has correct root element', function(assert) {
  this.render(hbs`<div class="first-child"></div>`);

  assert.dom(':first-child').hasClass('first-child', ':first-child returns the first element');
});
