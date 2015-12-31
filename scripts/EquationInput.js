import { debounce, repeat } from 'helperFunctions';
import ExpressionTree from 'ExpressionTree';
import EquationSolver from 'EquationSolver';

export default class EquationInput {
  constructor(inputElement, variableTable, answerOutput) {
    this.inputElement = inputElement;
    this.variableTable = variableTable;
    this.answerOutput = answerOutput;
    this.expressionTree1 = new ExpressionTree();
    this.expressionTree2 = new ExpressionTree();
    this.value = null;
    this._attachEvents();
  }

  _attachEvents() {
    this.inputElement.addEventListener('input', debounce(() => {
      const inputValue = this.inputElement.value;
      const numEquals = (inputValue.match(/=/g) || []).length;

      try {
        if (numEquals > 1) {
          throw new Error('Too many equal symbols');
        } else if (numEquals === 1) { // equation to be solved
          const expressions = inputValue.split('=');
          let equationSolver = null;

          this.expressionTree1.updateEquation(expressions[0]);
          this.expressionTree2.updateEquation(expressions[1]);

          equationSolver = new EquationSolver(this.expressionTree1, this.expressionTree2, this.variableTable.getContext());
          this.answerOutput.innerText = equationSolver.evaluate();
        } else { // expression
          const fixedInput = this._fixInputValue(this.inputElement.value);

          this.expressionTree1.updateEquation(fixedInput);

          this.value = this.expressionTree1.evaluate(this.variableTable.getContext());
          this.answerOutput.innerText = !isNaN(this.value) ? this.value : '';
        }
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