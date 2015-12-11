'use strict';

define(['exports', 'PostfixConverter', 'BinaryNode', 'UnaryNode', 'ConstantNode', 'Operators'], function (exports, _PostfixConverter, _BinaryNode, _UnaryNode, _ConstantNode, _Operators) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _PostfixConverter2 = _interopRequireDefault(_PostfixConverter);

  var _BinaryNode2 = _interopRequireDefault(_BinaryNode);

  var _UnaryNode2 = _interopRequireDefault(_UnaryNode);

  var _ConstantNode2 = _interopRequireDefault(_ConstantNode);

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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  var ExpressionTree = (function () {
    function ExpressionTree(expressionString) {
      _classCallCheck(this, ExpressionTree);

      this.postfixConverter = new _PostfixConverter2.default();
      var postfixStringArray = this.postfixConverter.toPostfix(expressionString);
      this.expressionTree = this._postfixToTree(postfixStringArray);
    }

    _createClass(ExpressionTree, [{
      key: '_postfixToTree',
      value: function _postfixToTree(postfixString) {
        var operandStack = [];
        postfixString.forEach(function (op) {
          if (_Operators.BINARY_OPS.has(op)) {
            operandStack.push(new (Function.prototype.bind.apply(_BinaryNode2.default, [null].concat([op], _toConsumableArray([operandStack.pop(), operandStack.pop()].reverse()))))());
          } else if (_Operators.UNARY_OPS.has(op)) {
            operandStack.push(new _UnaryNode2.default(op, operandStack.pop()));
          } else {
            operandStack.push(new _ConstantNode2.default(isNaN(+op) ? op : +op));
          }
        });
        return operandStack.pop();
      }
    }, {
      key: 'getExpressionTree',
      value: function getExpressionTree() {
        return this.expressionTree;
      }
    }, {
      key: 'evaluate',
      value: function evaluate(context) {
        return this.expressionTree.evaluate(context);
      }
    }, {
      key: 'updateEquation',
      value: function updateEquation(expressionString) {
        var postfixStringArray = this.postfixConverter.toPostfix(expressionString);
        this.expressionTree = this._postfixToTree(postfixStringArray);
      }
    }]);

    return ExpressionTree;
  })();

  exports.default = ExpressionTree;
});