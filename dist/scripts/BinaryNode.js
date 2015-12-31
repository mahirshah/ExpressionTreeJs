'use strict';

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

define(['exports', 'ExpressionNode', 'Operators'], function (exports, _ExpressionNode2, _Operators) {
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

  var BinaryNode = (function (_ExpressionNode) {
    _inherits(BinaryNode, _ExpressionNode);

    function BinaryNode(operator) {
      var left = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

      _classCallCheck(this, BinaryNode);

      var right = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BinaryNode).call(this));

      _this.operator = operator;
      _this.left = left;
      _this.right = right;
      return _this;
    }

    _createClass(BinaryNode, [{
      key: 'evaluate',
      value: function evaluate(context) {
        return _Operators.OPERATOR_FUNCTION_MAP.get(this.operator)(this.left.evaluate(context), this.right.evaluate(context));
      }
    }, {
      key: 'iterate',
      value: function iterate(callback) {
        var thisArg = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        this.left.iterate(callback, thisArg);
        this.right.iterate(callback, thisArg);
      }
    }, {
      key: 'toInfix',
      value: function toInfix() {
        return '(' + this.left.toInfix() + this.operator + this.right.toInfix() + ')';
      }
    }]);

    return BinaryNode;
  })(_ExpressionNode3.default);

  exports.default = BinaryNode;
});