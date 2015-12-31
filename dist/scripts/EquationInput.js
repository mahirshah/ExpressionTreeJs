'use strict';

define(['exports', 'helperFunctions', 'ExpressionTree', 'EquationSolver'], function (exports, _helperFunctions, _ExpressionTree, _EquationSolver) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ExpressionTree2 = _interopRequireDefault(_ExpressionTree);

  var _EquationSolver2 = _interopRequireDefault(_EquationSolver);

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

  var EquationInput = (function () {
    function EquationInput(inputElement, variableTable, answerOutput) {
      _classCallCheck(this, EquationInput);

      this.inputElement = inputElement;
      this.variableTable = variableTable;
      this.answerOutput = answerOutput;
      this.expressionTree1 = new _ExpressionTree2.default();
      this.expressionTree2 = new _ExpressionTree2.default();
      this.value = null;

      this._attachEvents();
    }

    _createClass(EquationInput, [{
      key: '_attachEvents',
      value: function _attachEvents() {
        var _this = this;

        this.inputElement.addEventListener('input', (0, _helperFunctions.debounce)(function () {
          var inputValue = _this.inputElement.value;
          var numEquals = (inputValue.match(/=/g) || []).length;

          try {
            if (numEquals > 1) {
              throw new Error('Too many equal symbols');
            } else if (numEquals === 1) {
              var expressions = inputValue.split('=');
              var equationSolver = null;

              _this.expressionTree1.updateEquation(expressions[0]);

              _this.expressionTree2.updateEquation(expressions[1]);

              equationSolver = new _EquationSolver2.default(_this.expressionTree1, _this.expressionTree2, _this.variableTable.getContext());
              _this.answerOutput.innerText = equationSolver.evaluate();
            } else {
              var fixedInput = _this._fixInputValue(_this.inputElement.value);

              _this.expressionTree1.updateEquation(fixedInput);

              _this.value = _this.expressionTree1.evaluate(_this.variableTable.getContext());
              _this.answerOutput.innerText = !isNaN(_this.value) ? _this.value : '';
            }
          } catch (exception) {
            _this.answerOutput.innerText = '';
          }
        }, 500));
      }
    }, {
      key: '_fixInputValue',
      value: function _fixInputValue(value) {
        var numOpenParens = (value.match(/\(/g) || []).length;
        var numCloseParens = (value.match(/\)/g) || []).length;

        if (numOpenParens > numCloseParens) {
          value += (0, _helperFunctions.repeat)(')', numOpenParens - numCloseParens);
        } else if (numOpenParens < numCloseParens) {
          throw new Error('Parentheses mismatch');
        }

        return value;
      }
    }]);

    return EquationInput;
  })();

  exports.default = EquationInput;
});