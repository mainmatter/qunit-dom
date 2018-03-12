/* eslint-env jest */

import TestAssertions from "../helpers/test-assertions";

describe('assert.dom(...).isDisabled()', () => {
  let assert;

  beforeEach(() => {
    assert = new TestAssertions();
  });

  describe('input tags', () => {
    test('succeeds when input is disabled', () => {
      document.body.innerHTML = '<input disabled>';

      assert.dom('input').isDisabled();
      assert.dom(document.querySelector('input')).isDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is disabled',
        expected: 'Element input is disabled',
        message: 'Element input is disabled',
        result: true,
      }, {
        actual: 'Element input[disabled] is disabled',
        expected: 'Element input[disabled] is disabled',
        message: 'Element input[disabled] is disabled',
        result: true,
      }]);
    });

    test('fails when input is not disabled', () => {
      document.body.innerHTML = '<input>';

      assert.dom('input').isDisabled();
      assert.dom(document.querySelector('input')).isDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element input is not disabled',
        expected: 'Element input is disabled',
        message: 'Element input is disabled',
        result: false,
      }, {
        actual: 'Element input is not disabled',
        expected: 'Element input is disabled',
        message: 'Element input is disabled',
        result: false,
      }]);
    });
  });

  describe('non-disablable elements', () => {
    test('fails when element does not support disabled', () => {
      document.body.innerHTML = '<div id="dis" disabled><div>';

      assert.dom('div#dis').isDisabled();
      assert.dom(document.querySelector('div#dis')).isDisabled();

      expect(assert.results).toEqual([{
        actual: 'Element div#dis does not support disabled',
        expected: 'Element div#dis is disabled',
        message: 'Element div#dis is disabled',
        result: false,
      }, {
        actual: 'Element div#dis[disabled] does not support disabled',
        expected: 'Element div#dis[disabled] is disabled',
        message: 'Element div#dis[disabled] is disabled',
        result: false,
      }]);
    });
  });
});
