import VariableTable from 'VariableTable';
import EquationTree from 'EquationTree';
import EquationInput from 'EquationInput';

const addVariableButtonClass = '.add-variable-button';
const variableTableClass = '.variable-table';
const equationInputClass = '.equation';

const variableTable = new VariableTable(document.querySelector(addVariableButtonClass), document.querySelector(variableTableClass));
const equationInput = new EquationInput(document.querySelector(equationInputClass), variableTable);
