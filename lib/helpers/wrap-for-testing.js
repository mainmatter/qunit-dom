const find = require('./find');

module.exports = function(testFn) {
  return function() {
    let result = undefined;
    let context = {
      rootElement: document,

      _find: find,

      pushResult(_result) {
        result = _result;
      }
    };

    testFn.apply(context, arguments);

    return result;
  }
};
