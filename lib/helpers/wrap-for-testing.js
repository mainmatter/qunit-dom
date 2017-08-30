module.exports = function(testFn) {
  return function() {
    let result = undefined;
    let context = {
      rootElement: document,

      pushResult(_result) {
        result = _result;
      }
    };

    testFn.apply(context, arguments);

    return result;
  }
};
