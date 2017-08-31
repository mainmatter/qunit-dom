/* eslint-env jest */

const fs = require('fs');

let bundleFile = fs.readFileSync(`${__dirname}/qunit-dom.js`, 'utf8');

let assertions = fs.readdirSync(`${__dirname}/assertions`)
  .filter(it => it.indexOf('.test.js') === -1);

assertions.forEach(filename => {
  test(`${filename} is reexported`, () => {
    expect(bundleFile).toContain(filename.replace(/\.js$/, ''));
  });
});
