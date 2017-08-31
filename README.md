qunit-dom
==============================================================================

[![TravisCI Build Status][travis-badge]][travis-badge-url]
[![Latest NPM release][npm-badge]][npm-badge-url]

[npm-badge]: https://img.shields.io/npm/v/qunit-dom.svg
[npm-badge-url]: https://www.npmjs.com/package/qunit-dom
[travis-badge]: https://img.shields.io/travis/simplabs/qunit-dom/master.svg
[travis-badge-url]: https://travis-ci.org/simplabs/qunit-dom

DOM element assertions for [QUnit](https://qunitjs.com/)

Install
------------------------------------------------------------------------------

### npm

```bash
npm install --save-dev qunit-dom
```

or using [`yarn`](https://yarnpkg.com/):

```bash
yarn add --dev qunit-dom
```

(This is the recommended method for Ember projects.)

### `<script>` Tag

Load `qunit-dom.js` *after* `qunit.js`:

```html
<script src="https://unpkg.com/qunitjs/qunit/qunit.js"></script>
<script src="https://unpkg.com/qunit-dom/dist/qunit-dom.js"></script>
```


Usage
------------------------------------------------------------------------------

Once installed the DOM element assertions are available at `assert.dom.*`:

```js
test('the title is friendly', function(assert) {
  assert.dom.textContains('#title', 'Welcome');
});
```


Assertions
------------------------------------------------------------------------------

### `exists(selector, [options], [message])`
### `missing(selector, [message])`

Assert an [HTMLElement][] (or multiple) matching the `selector` exists.

```js
assert.dom.exists('#title');
assert.dom.exists('.choice', { count: 4 });
assert.dom.missing('.should-not-exist');
```


### `focused(selector|element, [message])`
### `notFocused(selector|element, [message])`

Assert that the [HTMLElement][] is or is not currently focused.

```js
assert.dom.focused('input.email');
assert.dom.notFocused(document.querySelector('input[type="password"]'));
```


### `textContains(selector|element, text, [message])`

Assert that the text of the [HTMLElement][] contains the given `text`, using
[`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

```js
assert.dom.textContains('#title', 'Welcome');
assert.dom.textContains(document.querySelector('#title'), 'Welcome');
```


### `textMatches(selector|element, regex, [message])`

Assert that the text of the [HTMLElement][] matches the given regular expression, using
[`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent).

```js
assert.dom.textMatches('.foo', /[12]\d{3}/);
assert.dom.textMatches(document.querySelector('.foo'), /[12]\d{3}/);
```


[HTMLElement]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
[NodeList]: https://developer.mozilla.org/en-US/docs/Web/API/NodeList


Related
------------------------------------------------------------------------------

- [chai-dom](https://github.com/nathanboktae/chai-dom) – DOM assertions for
  the Chai assertion library using vanilla JavaScript
- [chai-jquery](https://github.com/chaijs/chai-jquery) – jQuery assertions
  for chai


License
------------------------------------------------------------------------------

ember-test-selectors is developed by and &copy;
[simplabs GmbH](http://simplabs.com) and contributors. It is released under the
[MIT License](https://github.com/simplabs/ember-simple-auth/blob/master/LICENSE).
