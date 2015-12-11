'use strict';

define(['exports', 'Operators'], function (exports, _Operators) {
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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  RegExp.escape = function (s) {
    return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  var PostfixCoverter = (function () {
    function PostfixCoverter() {
      _classCallCheck(this, PostfixCoverter);

      var context = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
      var contextVars = Object.keys(context).sort(function (a, b) {
        return a.length < b.length;
      });
      var operatorString = [].concat(_toConsumableArray(_Operators.BINARY_OPS), _toConsumableArray(_Operators.UNARY_OPS), _toConsumableArray(_Operators.PARENS), _toConsumableArray(contextVars)).map(RegExp.escape, RegExp).join('|');
      this.rOperatorRegex = new RegExp('(' + operatorString + ')');
      this.context = context;
    }

    _createClass(PostfixCoverter, [{
      key: 'toPostfix',
      value: function toPostfix(infixString) {
        var _this = this;

        var operatorStack = [];
        var expressionStack = [];
        infixString.split(this.rOperatorRegex).filter(function (str) {
          return str.length;
        }).map(function (op, idx, arr) {
          return _this._isOperatorUnaryMinus(op, idx, arr) ? _Operators.UNARY_MINUS_ALT : op;
        }).forEach(function (op) {
          return _this._processOp(op, operatorStack, expressionStack);
        });
        return expressionStack.concat(operatorStack.reverse());
      }
    }, {
      key: '_processOp',
      value: function _processOp(op, operatorStack, expressionStack) {
        if (_Operators.BINARY_OPS.has(op) || _Operators.UNARY_OPS.has(op)) {
          while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(' && _Operators.PRECEDENCE.get(operatorStack[operatorStack.length - 1]) >= _Operators.PRECEDENCE.get(op)) {
            expressionStack.push(operatorStack.pop());
          }

          operatorStack.push(op);
        } else if (op === '(') {
          operatorStack.push(op);
        } else if (op === ')') {
          while (operatorStack[operatorStack.length - 1] !== '(') {
            expressionStack.push(operatorStack.pop());
          }

          operatorStack.pop();
        } else {
          expressionStack.push(op);
        }
      }
    }, {
      key: '_isOperatorUnaryMinus',
      value: function _isOperatorUnaryMinus(op, idx, stringArr) {
        var prevChar = stringArr[idx - 1];
        return op === _Operators.UNARY_MINUS && (idx === 0 || _Operators.BINARY_OPS.has(prevChar) || _Operators.UNARY_OPS.has(prevChar) || prevChar === '(');
      }
    }]);

    return PostfixCoverter;
  })();

  exports.default = PostfixCoverter;
});