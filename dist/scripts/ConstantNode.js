'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'ExpressionNode'], function (exports, _ExpressionNode2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ExpressionNode3 = _interopRequireDefault(_ExpressionNode2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var ConstantNode = (function (_ExpressionNode) {
    _inherits(ConstantNode, _ExpressionNode);

    function ConstantNode(constant) {
      _classCallCheck(this, ConstantNode);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ConstantNode).call(this));

      _this.constant = constant;
      return _this;
    }

    _createClass(ConstantNode, [{
      key: 'evaluate',
      value: function evaluate(context) {
        return +context[this.constant] || this.constant;
      }
    }, {
      key: 'iterate',
      value: function iterate(callback) {
        var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        callback.call(thisArg, this.constant);
      }
    }, {
      key: 'toInfix',
      value: function toInfix() {
        return this.constant;
      }
    }]);

    return ConstantNode;
  })(_ExpressionNode3.default);

  exports.default = ConstantNode;
});