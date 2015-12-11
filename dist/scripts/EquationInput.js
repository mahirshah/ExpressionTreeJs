'use strict';

define(['exports', 'helperFunctions', 'ExpressionTree'], function (exports, _helperFunctions, _ExpressionTree) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ExpressionTree2 = _interopRequireDefault(_ExpressionTree);

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
      this.equationTree = new _ExpressionTree2.default(this.inputElement.value);
      this.value = null;

      this._attachEvents();
    }

    _createClass(EquationInput, [{
      key: '_attachEvents',
      value: function _attachEvents() {
        var _this = this;

        this.inputElement.addEventListener('input', (0, _helperFunctions.debounce)(function (evt) {
          var fixedInput = _this._fixInputValue(_this.inputElement.value);

          _this.equationTree.updateEquation(fixedInput);

          try {
            _this.value = _this.equationTree.evaluate(_this.variableTable.getContext());
            _this.answerOutput.innerText = !isNaN(_this.value) ? _this.value : '';
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