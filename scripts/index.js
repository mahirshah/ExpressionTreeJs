import VariableTable from 'VariableTable';
import EquationTree from 'EquationTree';
import EquationInput from 'EquationInput';

const addVariableButtonClass = '.add-variable-button';
const variableTableClass = '.variable-table';
const equationInputClass = '.equation';
const answerOutputClass = '.answer';

const $addVariableButton = document.querySelector(addVariableButtonClass);
const $variableTable = document.querySelector(variableTableClass);
const $equationInput = document.querySelector(equationInputClass);
const $answerOutput = document.querySelector(answerOutputClass);

const variableTable = new VariableTable($addVariableButton, $variableTable);
const equationInput = new EquationInput($equationInput, variableTable, $answerOutput);
