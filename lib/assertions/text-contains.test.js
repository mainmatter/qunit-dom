/* eslint-env jest */

const textContains = require('./text-contains');

test('foo', () => {
  document.body.innerHTML = '<h1>foo</h1>bar';
  let h1 = document.querySelector('h1');
  expect(h1).toBeInstanceOf(HTMLElement);

  expect(textContains).toBeDefined();
});
