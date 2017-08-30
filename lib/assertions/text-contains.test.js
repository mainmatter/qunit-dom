/* eslint-env jest */

test('foo', () => {
  document.body.innerHTML = '<h1>foo</h1>bar';
  let h1 = document.querySelector('h1');
  expect(h1).toBeInstanceOf(HTMLElement);
});
