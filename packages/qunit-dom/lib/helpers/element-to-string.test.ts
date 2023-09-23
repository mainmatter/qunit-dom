/* eslint-env jest */

import elToString from './element-to-string';

describe('NodeLists', () => {
  test('empty NodeList', () => {
    document.body.innerHTML = '';
    expect(elToString(document.querySelectorAll('h1'))).toBe('empty NodeList');
  });

  test('with single element', () => {
    document.body.innerHTML = '<h1></h1>';
    expect(elToString(document.querySelectorAll('h1'))).toBe('h1');
  });

  test('with three elements', () => {
    document.body.innerHTML = '<h1></h1><h1></h1><h1 class="foo"></h1>';
    expect(elToString(document.querySelectorAll('h1'))).toBe('h1, h1, h1.foo');
  });

  test('with five elements', () => {
    document.body.innerHTML = '<h1></h1><h1></h1><h1 class="foo"></h1><h1></h1><h1></h1>';
    expect(elToString(document.querySelectorAll('h1'))).toBe('h1, h1, h1.foo, h1, h1');
  });

  test('with six elements', () => {
    document.body.innerHTML = '<h1></h1><h1></h1><h1 class="foo"></h1>' + '<h1></h1>'.repeat(3);
    expect(elToString(document.querySelectorAll('h1'))).toBe('h1, h1, h1.foo, h1, h1... (+1 more)');
  });

  test('with ten elements', () => {
    document.body.innerHTML = '<h1></h1><h1></h1><h1 class="foo"></h1>' + '<h1></h1>'.repeat(7);
    expect(elToString(document.querySelectorAll('h1'))).toBe('h1, h1, h1.foo, h1, h1... (+5 more)');
  });
});

test('strings', () => {
  expect(elToString('h1')).toBe('h1');
  expect(elToString('[data-test-foo]')).toBe('[data-test-foo]');
});

describe('HTMLElements', () => {
  test('lower cased tag names', () => {
    document.body.innerHTML = '<H1></H1>';
    expect(elToString(document.querySelector('H1'))).toBe('h1');
  });

  test('IDs', () => {
    document.body.innerHTML = '<div id="map"></div>';
    expect(elToString(document.querySelector('div'))).toBe('div#map');
  });

  test('CSS classes', () => {
    document.body.innerHTML = '<div class="foo bar"></div>';
    expect(elToString(document.querySelector('div'))).toBe('div.foo.bar');
  });

  test('attributes', () => {
    document.body.innerHTML = '<input type="password">';
    expect(elToString(document.querySelector('input'))).toBe('input[type="password"]');

    document.body.innerHTML = '<input data-test-username>';
    expect(elToString(document.querySelector('input'))).toBe('input[data-test-username]');
  });
});
