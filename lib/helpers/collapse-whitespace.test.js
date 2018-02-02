/* eslint-env jest */

import collapseWhitespace from './collapse-whitespace';

let testElement = document.createElement('div');
testElement.innerHTML = ' &nbsp; a &nbsp; b &nbsp; ';

const TESTS = [
  ['', ''],
  ['abc', 'abc'],
  ['a b c', 'a b c'],
  ['a     b\tc', 'a b c'],
  [' a b c ', 'a b c'],
  [' a\r\n b c ', 'a b c'],
  ['\n    foo equals\n    bar\n  ', 'foo equals bar'],
  [testElement.textContent, 'a b'],
];

TESTS.forEach(it => {
  let input = it[0];
  let expected = it[1];

  test(`${JSON.stringify(input)} -> ${JSON.stringify(expected)}`, () => {
    expect(collapseWhitespace(input)).toEqual(expected);
  });
});
