import { debounce, repeat } from 'helperFunctions';
import ExpressionTree from 'ExpressionTree';

export default class EquationInput {
  constructor(inputElement, variableTable, answerOutput) {
    this.inputElement = inputElement;
    this.variableTable = variableTable;
    this.answerOutput = answerOutput;
    this.equationTree = new ExpressionTree(this.inputElement.value);
    this.value = null;
    this._attachEvents();
  }

  _attachEvents() {
    this.inputElement.addEventListener('input', debounce((evt) => {
      const fixedInput = this._fixInputValue(this.inputElement.value);

      this.equationTree.updateEquation(fixedInput);

      try {
        this.value = this.equationTree.evaluate(this.variableTable.getContext());

        this.answerOutput.innerText = !isNaN(this.value) ? this.value : '';
      } catch (exception) {
        this.answerOutput.innerText = '';
      }
    }, 500));
  }

  /**
   * Takes the given input value and "fixes" it to make it a valid expression
   * @param {string} value - the original input value
   * @return {string} - the fixed input value
   * @private
   */
  _fixInputValue(value) {
    const numOpenParens = (value.match(/\(/g) || []).length;
    const numCloseParens = (value.match(/\)/g) || []).length;

    // make sure we have same number of opening as closing parens
    if (numOpenParens > numCloseParens) {
      value += repeat(')', numOpenParens - numCloseParens);
    } else if (numOpenParens < numCloseParens) {
      throw new Error('Parentheses mismatch');
    }

    return value;
  }
}