import { debounce } from 'helperFunctions';
import EquationTree from 'EquationTree';

export default class EquationInput {
  constructor(inputElement, variableTable) {
    this.inputElement = inputElement;
    this.variableTable = variableTable;
    this.equationTree = new EquationTree(this.inputElement.value);
    this.value = null;
    this._attachEvents();
  }

  _attachEvents() {
    this.inputElement.addEventListener('keyup', debounce((evt) => {
      this.equationTree.updateEquation(this.inputElement.value);
      this.value = this.equationTree.evaluate(this.variableTable.getContext());
      console.log(this.value);
    }, 1000));
  }

  /**
   * Takes the given input value and "fixes" it to make it a valid expression
   * @param {string} value - the original input value
   * @return {string} - the fixed input value
   * @private
   */
  _fixInputValue(value) {
    // make sure we have same number of opening as closing parens
    const numOpenParens = (value.match(/\(/) || []).length;
    const numCloseParens = (value.match(/\)/) || []).length;

    if (numOpenParens !== numCloseParens) {
      if(numOpenParens > numCloseParens) {

      }
    }
  }
}