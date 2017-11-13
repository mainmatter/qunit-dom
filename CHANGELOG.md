# Changelog

## v0.3.4 (2017-11-13)

#### :rocket: Enhancement
* [#36](https://github.com/simplabs/qunit-dom/pull/36) Add `doesNotIncludeText()` assertion. ([@Zureka](https://github.com/Zureka))

#### Committers: 1
- Alex Zurek ([Zureka](https://github.com/Zureka))


## v0.3.3 (2017-10-21)

#### :rocket: Enhancement
* [#33](https://github.com/simplabs/qunit-dom/pull/33) Ember: Convert `rootElement` to non-caching property. ([@Turbo87](https://github.com/Turbo87))
* [#32](https://github.com/simplabs/qunit-dom/pull/32) Rename `hasTextContaining()` to `includesText()`. ([@Oreoz](https://github.com/Oreoz))
* [#31](https://github.com/simplabs/qunit-dom/pull/31) Add includesText() alias. ([@Oreoz](https://github.com/Oreoz))

#### :memo: Documentation
* [#29](https://github.com/simplabs/qunit-dom/pull/29) README: Fix example code. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 2
- Jean-Philippe Roy ([Oreoz](https://github.com/Oreoz))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.2 (2017-10-10)

#### :rocket: Enhancement
* [#28](https://github.com/simplabs/qunit-dom/pull/28) Adds hasAttribute() and doesNotHaveAttribute() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#27](https://github.com/simplabs/qunit-dom/pull/27) Add lacksClass() and lacksValue() aliases. ([@Turbo87](https://github.com/Turbo87))
* [#26](https://github.com/simplabs/qunit-dom/pull/26) Add doesNotHaveClass/hasNoClass() assertion. ([@Turbo87](https://github.com/Turbo87))
* [#25](https://github.com/simplabs/qunit-dom/pull/25)  Add hasAnyValue() assertion and support for calling hasValue() without arguments. ([@Turbo87](https://github.com/Turbo87))
* [#24](https://github.com/simplabs/qunit-dom/pull/24) Add hasNoValue() assertion. ([@Turbo87](https://github.com/Turbo87))

#### :house: Internal
* [#23](https://github.com/simplabs/qunit-dom/pull/23) tests/has-value: Ensure empty `value` does not break the assertion. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.1 (2017-10-09)

#### :rocket: Enhancement
* [#17](https://github.com/simplabs/qunit-dom/pull/17) Add hasClass() assertion. ([@Turbo87](https://github.com/Turbo87))
* [#15](https://github.com/simplabs/qunit-dom/pull/15) Add hasValue() assertion. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#16](https://github.com/simplabs/qunit-dom/pull/16) Add @see directives to JSDoc comments. ([@Turbo87](https://github.com/Turbo87))

#### Committers: 1
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))


## v0.3.0 (2017-10-09)

#### :boom: Breaking Change
* [#13](https://github.com/simplabs/qunit-dom/pull/13) Replace contains/matchesText() with hasText() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#11](https://github.com/simplabs/qunit-dom/pull/11) Rename missing(), focused() and notFocused() assertions. ([@Turbo87](https://github.com/Turbo87))
* [#7](https://github.com/simplabs/qunit-dom/pull/7) Use assert.dom(selector).exists() instead of assert.dom.exists(selector). ([@Turbo87](https://github.com/Turbo87))

#### :bug: Bug Fix
* [#9](https://github.com/simplabs/qunit-dom/pull/9) Fix default "rootElement" for Ember projects. ([@Turbo87](https://github.com/Turbo87))

#### :memo: Documentation
* [#8](https://github.com/simplabs/qunit-dom/pull/8) Generate API docs from JSDoc comments. ([@Turbo87](https://github.com/Turbo87))
* [#1](https://github.com/simplabs/qunit-dom/pull/1) fix copyright notice. ([@marcoow](https://github.com/marcoow))

#### :house: Internal
* [#14](https://github.com/simplabs/qunit-dom/pull/14) Remove obsolete "rollup-plugin-commonjs" dependency. ([@Turbo87](https://github.com/Turbo87))
* [#12](https://github.com/simplabs/qunit-dom/pull/12) Refactoring of the internals. ([@Turbo87](https://github.com/Turbo87))
* [#10](https://github.com/simplabs/qunit-dom/pull/10)  Test assert.dom() API instead of importing directly. ([@Turbo87](https://github.com/Turbo87))
* [#5](https://github.com/simplabs/qunit-dom/pull/5) Fix package.json metadata. ([@Turbo87](https://github.com/Turbo87))
* [#2](https://github.com/simplabs/qunit-dom/pull/2) make travis notify our slack room instead of emailing. ([@marcoow](https://github.com/marcoow))

#### Committers: 2
- Marco Otte-Witte ([marcoow](https://github.com/marcoow))
- Tobias Bieniek ([Turbo87](https://github.com/Turbo87))
