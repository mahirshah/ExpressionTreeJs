"use strict";

define(["exports"], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var ExpressionNode = (function () {
    function ExpressionNode() {
      _classCallCheck(this, ExpressionNode);
    }

    _createClass(ExpressionNode, [{
      key: "isUnknown",
      value: function isUnknown(context) {
        var isUnknown = false;
        this.iterate(function (constant) {
          if (isNaN(constant) && !context[constant]) {
            isUnknown = true;
          }
        });
        return isUnknown;
      }
    }]);

    return ExpressionNode;
  })();

  exports.default = ExpressionNode;
});