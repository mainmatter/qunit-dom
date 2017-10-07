/* eslint-env jest */

const fs = require('fs');

let assertionsClassFile = fs.readFileSync(`${__dirname}/assertions.js`, 'utf8');

let assertions = fs.readdirSync(`${__dirname}/assertions`)
  .filter(it => it.indexOf('.test.js') === -1);

assertions.forEach(filename => {
  test(`${filename} is imported`, () => {
    expect(assertionsClassFile).toContain(filename.replace(/\.js$/, ''));
  });
});
