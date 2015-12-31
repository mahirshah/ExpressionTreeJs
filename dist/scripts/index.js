'use strict';

define(['VariableTable', 'EquationInput'], function (_VariableTable, _EquationInput) {
  var _VariableTable2 = _interopRequireDefault(_VariableTable);

  var _EquationInput2 = _interopRequireDefault(_EquationInput);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var addVariableButtonClass = '.add-variable-button';
  var variableTableClass = '.variable-table';
  var equationInputClass = '.equation';
  var answerOutputClass = '.answer';
  var $addVariableButton = document.querySelector(addVariableButtonClass);
  var $variableTable = document.querySelector(variableTableClass);
  var $equationInput = document.querySelector(equationInputClass);
  var $answerOutput = document.querySelector(answerOutputClass);
  var variableTable = new _VariableTable2.default($addVariableButton, $variableTable);
  var equationInput = new _EquationInput2.default($equationInput, variableTable, $answerOutput);
});