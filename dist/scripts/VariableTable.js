'use strict';

define(['exports', 'helperFunctions'], function (exports, _helperFunctions) {
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

  var variableNameInputClass = 'variable-name-input';
  var variableValueInputClass = 'variable-value-input';

  var VariableTable = (function () {
    function VariableTable(addRowButton, tableElement) {
      _classCallCheck(this, VariableTable);

      this.$addRowButton = addRowButton;
      this.$tableElement = tableElement;

      this._attachEvents();
    }

    _createClass(VariableTable, [{
      key: '_attachEvents',
      value: function _attachEvents() {
        var _this = this;

        this.$addRowButton.addEventListener('click', function (evt) {
          var tableRow = (0, _helperFunctions.createElement)('tr', {}, (0, _helperFunctions.createElement)('td', {}, (0, _helperFunctions.createElement)('input', {
            class: variableNameInputClass
          })), (0, _helperFunctions.createElement)('td', {}, (0, _helperFunctions.createElement)('input', {
            class: variableValueInputClass
          })));

          _this.$tableElement.appendChild(tableRow);
        });
      }
    }, {
      key: 'getContext',
      value: function getContext() {
        var variableNames = document.querySelectorAll('.' + variableNameInputClass);
        var variableValues = document.querySelectorAll('.' + variableValueInputClass);
        var context = {};
        Array.prototype.forEach.call(variableNames, function (variableNameInput, idx) {
          if (variableValues[idx]) {
            context[variableNameInput.value] = variableValues[idx].value;
          }
        });
        console.log(context);
        return context;
      }
    }]);

    return VariableTable;
  })();

  exports.default = VariableTable;
});