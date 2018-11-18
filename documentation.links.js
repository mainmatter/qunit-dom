/* eslint-env node */
const fs = require('fs');

// Allows documentation to contain simple shorthand links.
// For example: HTMLElement is defined below, so it will be added to the
// bottom of the API.md file. As such, all links in documentation that
// look like `[HTMLElement][]` will be properly resolved.

const links = {
  HTMLElement: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
  HTMLInputElement: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input',
};

const linksMarkdown = '\n' + Object.keys(links).map(key => `[${key}]: ${links[key]}\n`).join('');

fs.appendFileSync('API.md', linksMarkdown);
