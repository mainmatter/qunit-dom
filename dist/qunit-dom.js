(function (QUnit) {
'use strict';

function exists(options, message) {
  if (typeof this.target !== 'string') {
    throw new TypeError('Unexpected Parameter: ' + this.target);
  }

  if (typeof options === 'string') {
    message = options;
    options = undefined;
  }

  var elements = this.rootElement.querySelectorAll(this.target);

  var expectedCount = options ? options.count : null;

  if (expectedCount === null) {
    var result = elements.length > 0;
    var expected = format(this.target);
    var actual = result ? expected : format(this.target, 0);

    if (!message) {
      message = expected;
    }

    this.pushResult({ result: result, actual: actual, expected: expected, message: message });
  } else if (typeof expectedCount === 'number') {
    var _result = elements.length === expectedCount;
    var _actual = format(this.target, elements.length);
    var _expected = format(this.target, expectedCount);

    if (!message) {
      message = _expected;
    }

    this.pushResult({ result: _result, actual: _actual, expected: _expected, message: message });
  } else {
    throw new TypeError('Unexpected Parameter: ' + expectedCount);
  }
}

function format(selector, num) {
  if (num === undefined || num === null) {
    return 'Element ' + selector + ' exists';
  } else if (num === 0) {
    return 'Element ' + selector + ' does not exist';
  } else if (num === 1) {
    return 'Element ' + selector + ' exists once';
  } else if (num === 2) {
    return 'Element ' + selector + ' exists twice';
  } else {
    return 'Element ' + selector + ' exists ' + num + ' times';
  }
}

// imported from https://github.com/nathanboktae/chai-dom

function elementToString(el) {
  var desc = void 0;
  if (el instanceof window.NodeList) {
    if (el.length === 0) {
      return 'empty NodeList';
    }
    desc = Array.prototype.slice.call(el, 0, 5).map(elementToString).join(', ');
    return el.length > 5 ? desc + '... (+' + (el.length - 5) + ' more)' : desc;
  }
  if (!(el instanceof window.HTMLElement)) {
    return String(el);
  }

  desc = el.tagName.toLowerCase();
  if (el.id) {
    desc += '#' + el.id;
  }
  if (el.className) {
    desc += '.' + String(el.className).replace(/\s+/g, '.');
  }
  Array.prototype.forEach.call(el.attributes, function (attr) {
    if (attr.name !== 'class' && attr.name !== 'id') {
      desc += '[' + attr.name + (attr.value ? '="' + attr.value + '"]' : ']');
    }
  });
  return desc;
}

function focused(message) {
  var element = this.findTargetElement();
  if (!element) return;

  var result = document.activeElement === element;
  var actual = elementToString(document.activeElement);
  var expected = elementToString(this.target);

  if (!message) {
    message = 'Element ' + expected + ' is focused';
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function notFocused(message) {
  var element = this.findTargetElement();
  if (!element) return;

  var result = document.activeElement !== element;

  if (!message) {
    message = "Element " + this.targetDescription + " is not focused";
  }

  this.pushResult({ result: result, message: message });
}

function checked(message) {
  var element = this.findTargetElement();
  if (!element) return;

  var result = element.checked === true;
  var actual = element.checked === true ? 'checked' : 'not checked';
  var expected = 'checked';

  if (!message) {
    message = 'Element ' + elementToString(this.target) + ' is checked';
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function notChecked(message) {
  var element = this.findTargetElement();
  if (!element) return;

  var result = element.checked === false;
  var actual = element.checked === true ? 'checked' : 'not checked';
  var expected = 'not checked';

  if (!message) {
    message = 'Element ' + elementToString(this.target) + ' is not checked';
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function required(message) {
  var element = this.findTargetElement();
  if (!element) return;

  if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
    throw new TypeError('Unexpected Element Type: ' + element.toString());
  }

  var result = element.required === true;
  var actual = result ? 'required' : 'not required';
  var expected = 'required';

  if (!message) {
    message = 'Element ' + elementToString(this.target) + ' is required';
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function notRequired(message) {
  var element = this.findTargetElement();
  if (!element) return;

  if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement)) {
    throw new TypeError('Unexpected Element Type: ' + element.toString());
  }

  var result = element.required === false;
  var actual = !result ? 'required' : 'not required';
  var expected = 'not required';

  if (!message) {
    message = 'Element ' + elementToString(this.target) + ' is not required';
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

// Visible logic based on jQuery's
// https://github.com/jquery/jquery/blob/4a2bcc27f9c3ee24b3effac0fbe1285d1ee23cc5/src/css/hiddenVisibleSelectors.js#L11-L13

function visible(el) {
  if (el === null) return false;
  if (el.offsetWidth === 0 || el.offsetHeight === 0) return false;

  var clientRects = el.getClientRects();
  if (clientRects.length === 0) return false;
  for (var i = 0; i < clientRects.length; i++) {
    var rect = clientRects[i];
    if (rect.width !== 0 && rect.height !== 0) return true;
  }

  return false;
}

function isVisible(message) {
  var element = this.findElement();

  var result = visible(element);
  var actual = result ? 'Element ' + this.target + ' is visible' : 'Element ' + this.target + ' is not visible';
  var expected = 'Element ' + this.target + ' is visible';

  if (!message) {
    message = expected;
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function isNotVisible(message) {
  var element = this.findElement();

  var result = !visible(element);
  var actual = result ? 'Element ' + this.target + ' is not visible' : 'Element ' + this.target + ' is visible';
  var expected = 'Element ' + this.target + ' is not visible';

  if (!message) {
    message = expected;
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function isDisabled(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var inverted = options.inverted;


  var element = this.findTargetElement();
  if (!element) return;

  if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement || element instanceof HTMLSelectElement || element instanceof HTMLButtonElement || element instanceof HTMLOptGroupElement || element instanceof HTMLOptionElement || element instanceof HTMLFieldSetElement)) {
    throw new TypeError("Unexpected Element Type: " + element.toString());
  }

  var result = element.disabled === !inverted;

  var actual = element.disabled === false ? "Element " + this.targetDescription + " is not disabled" : "Element " + this.targetDescription + " is disabled";

  var expected = inverted ? "Element " + this.targetDescription + " is not disabled" : "Element " + this.targetDescription + " is disabled";

  if (!message) {
    message = expected;
  }

  this.pushResult({ result: result, actual: actual, expected: expected, message: message });
}

function collapseWhitespace(string) {
  return string.replace(/[\t\r\n]/g, ' ').replace(/ +/g, ' ').replace(/^ /, '').replace(/ $/, '');
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMAssertions = function () {
  function DOMAssertions(target, rootElement, testContext) {
    _classCallCheck(this, DOMAssertions);

    this.target = target;
    this.rootElement = rootElement;
    this.testContext = testContext;
  }

  /**
   * Assert an [HTMLElement][] (or multiple) matching the `selector` exists.
   *
   * @name exists
   * @param {object?} options
   * @param {string?} message
   *
   * @example
   * assert.dom('#title').exists();
   * assert.dom('.choice').exists({ count: 4 });
   *
   * @see {@link #doesNotExist}
   */


  _createClass(DOMAssertions, [{
    key: 'exists',
    value: function exists$$1(options, message) {
      exists.call(this, options, message);
    }

    /**
     * Assert an [HTMLElement][] matching the `selector` does not exists.
     *
     * @name doesNotExist
     * @param {string?} message
     *
     * @example
     * assert.dom('.should-not-exist').doesNotExist();
     *
     * @see {@link #exists}
     */

  }, {
    key: 'doesNotExist',
    value: function doesNotExist(message) {
      exists.call(this, { count: 0 }, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is currently checked.
     *
     * @name isChecked
     * @param {string?} message
     *
     * @example
     * assert.dom('input.active').isChecked();
     *
     * @see {@link #isNotChecked}
     */

  }, {
    key: 'isChecked',
    value: function isChecked(message) {
      checked.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is currently unchecked.
     *
     * @name isNotChecked
     * @param {string?} message
     *
     * @example
     * assert.dom('input.active').isNotChecked();
     *
     * @see {@link #isChecked}
     */

  }, {
    key: 'isNotChecked',
    value: function isNotChecked(message) {
      notChecked.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is currently focused.
     *
     * @name isFocused
     * @param {string?} message
     *
     * @example
     * assert.dom('input.email').isFocused();
     *
     * @see {@link #isNotFocused}
     */

  }, {
    key: 'isFocused',
    value: function isFocused(message) {
      focused.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is not currently focused.
     *
     * @name isNotFocused
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').isNotFocused();
     *
     * @see {@link #isFocused}
     */

  }, {
    key: 'isNotFocused',
    value: function isNotFocused(message) {
      notFocused.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is currently required.
     *
     * @name isRequired
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="text"]').isRequired();
     *
     * @see {@link #isNotRequired}
     */

  }, {
    key: 'isRequired',
    value: function isRequired(message) {
      required.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is currently not required.
     *
     * @name isNotRequired
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="text"]').isNotRequired();
     *
     * @see {@link #isRequired}
     */

  }, {
    key: 'isNotRequired',
    value: function isNotRequired(message) {
      notRequired.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` exists and is visible.
     *
     * Visibility is determined by asserting that:
     *
     * - the element's offsetWidth and offsetHeight are non-zero
     * - any of the element's DOMRect objects have a non-zero size
     *
     * Additionally, visibility in this case means that the element is visible on the page,
     * but not necessarily in the viewport.
     *
     * @name isVisible
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isVisible();
     *
     * @see {@link #isNotVisible}
     */

  }, {
    key: 'isVisible',
    value: function isVisible$$1(message) {
      isVisible.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` does not exist or is not visible on the page.
     *
     * Visibility is determined by asserting that:
     *
     * - the element's offsetWidth or offsetHeight are zero
     * - all of the element's DOMRect objects have a size of zero
     *
     * Additionally, visibility in this case means that the element is visible on the page,
     * but not necessarily in the viewport.
     *
     * @name isNotVisible
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isNotVisible();
     *
     * @see {@link #isVisible}
     */

  }, {
    key: 'isNotVisible',
    value: function isNotVisible$$1(message) {
      isNotVisible.call(this, message);
    }

    /**
     * Assert that the [HTMLElement][] has an attribute with the provided `name`
     * and optionally checks if the attribute `value` matches the provided text
     * or regular expression.
     *
     * @name hasAttribute
     * @param {string} name
     * @param {string|RegExp|object?} value
     * @param {string?} message
     *
     * @example
     * assert.dom('input.password-input').hasAttribute('type', 'password');
      * @see {@link #doesNotHaveAttribute}
     */

  }, {
    key: 'hasAttribute',
    value: function hasAttribute(name, value, message) {
      var element = this.findTargetElement();
      if (!element) return;

      if (arguments.length === 1) {
        value = { any: true };
      }

      var actualValue = element.getAttribute(name);

      if (value instanceof RegExp) {
        var result = value.test(actualValue);
        var expected = 'Element ' + this.targetDescription + ' has attribute "' + name + '" with value matching ' + value;
        var actual = actualValue === null ? 'Element ' + this.targetDescription + ' does not have attribute "' + name + '"' : 'Element ' + this.targetDescription + ' has attribute "' + name + '" with value ' + JSON.stringify(actualValue);

        if (!message) {
          message = expected;
        }

        this.pushResult({ result: result, actual: actual, expected: expected, message: message });
      } else if (value.any === true) {
        var _result = actualValue !== null;
        var _expected = 'Element ' + this.targetDescription + ' has attribute "' + name + '"';
        var _actual = _result ? _expected : 'Element ' + this.targetDescription + ' does not have attribute "' + name + '"';

        if (!message) {
          message = _expected;
        }

        this.pushResult({ result: _result, actual: _actual, expected: _expected, message: message });
      } else {
        var _result2 = value === actualValue;
        var _expected2 = 'Element ' + this.targetDescription + ' has attribute "' + name + '" with value ' + JSON.stringify(value);
        var _actual2 = actualValue === null ? 'Element ' + this.targetDescription + ' does not have attribute "' + name + '"' : 'Element ' + this.targetDescription + ' has attribute "' + name + '" with value ' + JSON.stringify(actualValue);

        if (!message) {
          message = _expected2;
        }

        this.pushResult({ result: _result2, actual: _actual2, expected: _expected2, message: message });
      }
    }

    /**
     * Assert that the [HTMLElement][] has no attribute with the provided `name`.
     *
     * **Aliases:** `hasNoAttribute`, `lacksAttribute`
     *
     * @name doesNotHaveAttribute
     * @param {string} name
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasNoAttribute('disabled');
     *
     * @see {@link #hasAttribute}
     */

  }, {
    key: 'doesNotHaveAttribute',
    value: function doesNotHaveAttribute(name, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var result = !element.hasAttribute(name);
      var expected = 'Element ' + this.targetDescription + ' does not have attribute "' + name + '"';
      var actual = expected;

      if (!result) {
        var value = element.getAttribute(name);
        actual = 'Element ' + this.targetDescription + ' has attribute "' + name + '" with value ' + JSON.stringify(value);
      }

      if (!message) {
        message = expected;
      }

      this.pushResult({ result: result, actual: actual, expected: expected, message: message });
    }
  }, {
    key: 'hasNoAttribute',
    value: function hasNoAttribute(name, message) {
      this.doesNotHaveAttribute(name, message);
    }
  }, {
    key: 'lacksAttribute',
    value: function lacksAttribute(name, message) {
      this.doesNotHaveAttribute(name, message);
    }

    /**
     * Assert that the [HTMLElement][] has a style property with the provided `value`.
     * @name hasStyle
     * @param {string} name
     * @param {string} value
     * @param {string?} message
     *
     * @example
     * assert.dom('.progress-bar').hasStyle('backgroundColor', 'rgb(248, 183, 21)');
     *
     * @see {@link #hasStyle}
     */

  }, {
    key: 'hasStyle',
    value: function hasStyle(name, value, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var elementStyleValue = element.style[name];
      var result = elementStyleValue === value;
      var expected = 'Element ' + this.targetDescription + ' has style property "' + name + '" with value ' + value;
      var actual = expected;

      if (!result) {
        actual = 'Element ' + this.targetDescription + ' has style property "' + name + '" with value ' + elementStyleValue;
      }

      if (!message) {
        message = expected;
      }

      this.pushResult({ result: result, actual: actual, expected: expected, message: message });
    }

    /**
     *  Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is disabled.
     *
     * @name isDisabled
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isDisabled();
     *
     * @see {@link #isNotDisabled}
     */

  }, {
    key: 'isDisabled',
    value: function isDisabled$$1(message) {
      isDisabled.call(this, message);
    }

    /**
     *  Assert that the [HTMLElement][] or an [HTMLElement][] matching the
     * `selector` is not disabled.
     *
     * @name isNotDisabled
     * @param {string?} message
     *
     * @example
     * assert.dom('.foo').isNotDisabled();
     *
     * @see {@link #isDisabled}
     */

  }, {
    key: 'isNotDisabled',
    value: function isNotDisabled(message) {
      isDisabled.call(this, message, { inverted: true });
    }

    /**
     * Assert that the [HTMLElement][] has the `expected` CSS class using
     * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
     *
     * @name hasClass
     * @param {string} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').hasClass('secret-password-input');
     *
     * @see {@link #doesNotHaveClass}
     */

  }, {
    key: 'hasClass',
    value: function hasClass(expected, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var actual = element.classList.toString();
      var result = element.classList.contains(expected);

      if (!message) {
        message = 'Element ' + this.targetDescription + ' has CSS class "' + expected + '"';
      }

      this.pushResult({ result: result, actual: actual, expected: expected, message: message });
    }

    /**
     * Assert that the [HTMLElement][] does not have the `expected` CSS class using
     * [`classList`](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList).
     *
     * **Aliases:** `hasNoClass`, `lacksClass`
     *
     * @name doesNotHaveClass
     * @param {string} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input[type="password"]').doesNotHaveClass('username-input');
     *
     * @see {@link #hasClass}
     */

  }, {
    key: 'doesNotHaveClass',
    value: function doesNotHaveClass(expected, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var result = !element.classList.contains(expected);
      var actual = element.classList.toString();

      if (!message) {
        message = 'Element ' + this.targetDescription + ' does not have CSS class "' + expected + '"';
      }

      this.pushResult({ result: result, actual: actual, expected: 'not: ' + expected, message: message });
    }
  }, {
    key: 'hasNoClass',
    value: function hasNoClass(expected, message) {
      this.doesNotHaveClass(expected, message);
    }
  }, {
    key: 'lacksClass',
    value: function lacksClass(expected, message) {
      this.doesNotHaveClass(expected, message);
    }

    /**
     * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
     * matching the `selector` matches the `expected` text, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute and stripping/collapsing whitespace.
     *
     * `expected` can also be a regular expression.
     *
     * **Aliases:** `matchesText`
     *
     * @name hasText
     * @param {string|RegExp} expected
     * @param {string?} message
     *
     * @example
     * // <h2 id="title">
     * //   Welcome to <b>QUnit</b>
     * // </h2>
     *
     * assert.dom('#title').hasText('Welcome to QUnit');
     *
     * @example
     * assert.dom('.foo').hasText(/[12]\d{3}/);
     *
     * @see {@link #includesText}
     */

  }, {
    key: 'hasText',
    value: function hasText(expected, message) {
      var element = this.findTargetElement();
      if (!element) return;

      if (expected instanceof RegExp) {
        var result = expected.test(element.textContent);
        var actual = element.textContent;

        if (!message) {
          message = 'Element ' + this.targetDescription + ' has text matching ' + expected;
        }

        this.pushResult({ result: result, actual: actual, expected: expected, message: message });
      } else if (expected.any === true) {
        var _result3 = Boolean(element.textContent);

        var _expected3 = 'Element ' + this.targetDescription + ' has a text';
        var _actual3 = _result3 ? _expected3 : 'Element ' + this.targetDescription + ' has no text';

        if (!message) {
          message = _expected3;
        }

        this.pushResult({ result: _result3, actual: _actual3, expected: _expected3, message: message });
      } else if (typeof expected === 'string') {
        expected = collapseWhitespace(expected);
        var _actual4 = collapseWhitespace(element.textContent);
        var _result4 = _actual4 === expected;

        if (!message) {
          message = 'Element ' + this.targetDescription + ' has text "' + expected + '"';
        }

        this.pushResult({ result: _result4, actual: _actual4, expected: expected, message: message });
      } else {
        throw new TypeError('You must pass a string or Regular Expression to "hasText". You passed ' + expected + '.');
      }
    }
  }, {
    key: 'matchesText',
    value: function matchesText(expected, message) {
      this.hasText(expected, message);
    }

    /**
     * Assert that the `textContent` property of an [HTMLElement][] is not empty.
     *
     * @name hasAnyText
     * @param {string?} message
     *
     * @example
     * assert.dom('button.share').hasAnyText();
     *
     * @see {@link #hasText}
     */

  }, {
    key: 'hasAnyText',
    value: function hasAnyText(message) {
      this.hasText({ any: true }, message);
    }

    /**
     * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
     * matching the `selector` contains the given `text`, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute.
     *
     * **Aliases:** `containsText`, `hasTextContaining`
     *
     * @name includesText
     * @param {string} text
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').includesText('Welcome');
     *
     * @see {@link #hasText}
     */

  }, {
    key: 'includesText',
    value: function includesText(text, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var result = element.textContent.indexOf(text) !== -1;
      var actual = element.textContent;
      var expected = text;

      if (!message) {
        message = 'Element ' + this.targetDescription + ' has text containing "' + text + '"';
      }

      this.pushResult({ result: result, actual: actual, expected: expected, message: message });
    }
  }, {
    key: 'containsText',
    value: function containsText(expected, message) {
      this.includesText(expected, message);
    }
  }, {
    key: 'hasTextContaining',
    value: function hasTextContaining(expected, message) {
      this.includesText(expected, message);
    }

    /**
     * Assert that the text of the [HTMLElement][] or an [HTMLElement][]
     * matching the `selector` does not include the given `text`, using the
     * [`textContent`](https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent)
     * attribute.
     *
     * **Aliases:** `doesNotContainText`, `doesNotHaveTextContaining`
     *
     * @name doesNotIncludeText
     * @param {string} text
     * @param {string?} message
     *
     * @example
     * assert.dom('#title').doesNotIncludeText('Welcome');
     */

  }, {
    key: 'doesNotIncludeText',
    value: function doesNotIncludeText(text, message) {
      var element = this.findTargetElement();
      if (!element) return;

      var result = element.textContent.indexOf(text) === -1;
      var expected = 'Element ' + this.targetDescription + ' does not include text "' + text + '"';
      var actual = expected;

      if (!result) {
        actual = 'Element ' + this.targetDescription + ' includes text "' + text + '"';
      }

      if (!message) {
        message = expected;
      }

      this.pushResult({ result: result, actual: actual, expected: expected, message: message });
    }
  }, {
    key: 'doesNotContainText',
    value: function doesNotContainText(unexpected, message) {
      this.doesNotIncludeText(unexpected, message);
    }
  }, {
    key: 'doesNotHaveTextContaining',
    value: function doesNotHaveTextContaining(unexpected, message) {
      this.doesNotIncludeText(unexpected, message);
    }

    /**
     * Assert that the `value` property of an [HTMLInputElement][] matches
     * the `expected` text or regular expression.
     *
     * If no `expected` value is provided, the assertion will fail if the
     * `value` is an empty string.
     *
     * @name hasValue
     * @param {string|RegExp|object?} expected
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasValue('HSimpson');
      * @see {@link #hasAnyValue}
     * @see {@link #hasNoValue}
     */

  }, {
    key: 'hasValue',
    value: function hasValue(expected, message) {
      var element = this.findTargetElement();
      if (!element) return;

      if (arguments.length === 0) {
        expected = { any: true };
      }

      if (expected instanceof RegExp) {
        var result = expected.test(element.value);
        var actual = element.value;

        if (!message) {
          message = 'Element ' + this.targetDescription + ' has value matching ' + expected;
        }

        this.pushResult({ result: result, actual: actual, expected: expected, message: message });
      } else if (expected.any === true) {
        var _result5 = Boolean(element.value);

        var _expected4 = 'Element ' + this.targetDescription + ' has a value';
        var _actual5 = _result5 ? _expected4 : 'Element ' + this.targetDescription + ' has no value';

        if (!message) {
          message = _expected4;
        }

        this.pushResult({ result: _result5, actual: _actual5, expected: _expected4, message: message });
      } else {
        var _actual6 = element.value;
        var _result6 = _actual6 === expected;

        if (!message) {
          message = 'Element ' + this.targetDescription + ' has value "' + expected + '"';
        }

        this.pushResult({ result: _result6, actual: _actual6, expected: expected, message: message });
      }
    }

    /**
     * Assert that the `value` property of an [HTMLInputElement][] is not empty.
     *
     * @name hasAnyValue
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasAnyValue();
     *
     * @see {@link #hasValue}
     * @see {@link #hasNoValue}
     */

  }, {
    key: 'hasAnyValue',
    value: function hasAnyValue(message) {
      this.hasValue({ any: true }, message);
    }

    /**
     * Assert that the `value` property of an [HTMLInputElement][] is empty.
     *
     * **Aliases:** `lacksValue`
     *
     * @name hasNoValue
     * @param {string?} message
     *
     * @example
     * assert.dom('input.username').hasNoValue();
     *
     * @see {@link #hasValue}
     * @see {@link #hasAnyValue}
     */

  }, {
    key: 'hasNoValue',
    value: function hasNoValue(message) {
      this.hasValue('', message);
    }
  }, {
    key: 'lacksValue',
    value: function lacksValue(message) {
      this.hasNoValue(message);
    }

    /**
     * @private
     */

  }, {
    key: 'pushResult',
    value: function pushResult(result) {
      this.testContext.pushResult(result);
    }

    /**
     * Finds a valid HTMLElement from target, or pushes a failing assertion if a valid
     * element is not found.
     * @private
     * @returns (HTMLElement|null) a valid HTMLElement, or null
     */

  }, {
    key: 'findTargetElement',
    value: function findTargetElement() {
      var el = this.findElement();

      if (el === null) {
        var message = 'Element ' + (this.target || '<unknown>') + ' should exist';
        this.pushResult({ message: message, result: false });
        return null;
      }

      return el;
    }

    /**
     * Finds a valid HTMLElement from target
     * @private
     * @returns (HTMLElement|null) a valid HTMLElement, or null
     * @throws TypeError will be thrown if target is an unrecognized type
     */

  }, {
    key: 'findElement',
    value: function findElement() {
      if (this.target === null) {
        return null;
      } else if (typeof this.target === 'string') {
        return this.rootElement.querySelector(this.target);
      } else if (this.target instanceof Element) {
        return this.target;
      } else {
        throw new TypeError('Unexpected Parameter: ' + this.target);
      }
    }

    /**
     * @private
     */

  }, {
    key: 'targetDescription',
    get: function get() {
      return elementToString(this.target);
    }
  }]);

  return DOMAssertions;
}();

QUnit.extend(QUnit.assert, {
  dom: function dom(target, rootElement) {
    rootElement = rootElement || this.dom.rootElement || document;
    return new DOMAssertions(target || rootElement, rootElement, this);
  }
});

}(QUnit));
//# sourceMappingURL=qunit-dom.js.map
