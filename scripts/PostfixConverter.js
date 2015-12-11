import {
  UNARY_MINUS,
  UNARY_MINUS_ALT,
  BINARY_OPS,
  UNARY_OPS,
  PRECEDENCE,
  PARENS
} from 'Operators';

RegExp.escape = function (s) {
  return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};

export default class PostfixCoverter {
  constructor(context = {}) {

    // need to sort vars by length to ensure that vars that contain substrings of other vars are parsed in proper order
    // i.e. the var 'Rdd' should be placed before the var 'Rd'
    const contextVars = Object.keys(context).sort((a, b) => a.length < b.length);
    const operatorString = [...BINARY_OPS, ...UNARY_OPS, ...PARENS, ...contextVars]
      .map(RegExp.escape, RegExp)
      .join('|');

    this.rOperatorRegex = new RegExp(`(${operatorString})`);
    this.context = context;
  }

  /**
   * Converts an infix string to a postfix array
   * @param {string} infixString - a valid infix string
   * @returns {Array.<string>} - the postfix array
   */
  toPostfix(infixString) {
    const operatorStack = [];
    const expressionStack = [];

    infixString
      .split(this.rOperatorRegex)
      .filter((str) => str.length)
      .map((op, idx, arr) => this._isOperatorUnaryMinus(op, idx, arr) ? UNARY_MINUS_ALT : op)
      .forEach((op) => this._processOp(op, operatorStack, expressionStack));

    // all characters have been added, so add rest of operators to expression
    return expressionStack.concat(operatorStack.reverse());
  }

  /**
   * @TODO: map constants to numbers in last case
   * Processes a single operator or operand
   * @param {string} op - operator or operand
   * @param {[]} operatorStack - the operator stack
   * @param {[]} expressionStack - the expression stack
   * @returns {void}
   * @private
   */
  _processOp(op, operatorStack, expressionStack) {
    if (BINARY_OPS.has(op) || UNARY_OPS.has(op)) {
      while (operatorStack.length &&
      operatorStack[operatorStack.length - 1] !== '(' &&
      PRECEDENCE.get(operatorStack[operatorStack.length - 1]) >= PRECEDENCE.get(op)) {
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
    } else { // number, constant, or variable
      expressionStack.push(op);
    }
  }

  /**
   * Returns if the given operator is the unary minus operator based on the given string
   * @param {string} op - the operator
   * @param {number}  idx - current index
   * @param {[]} stringArr - string array
   * @returns {boolean} - is the given op unary minus?
   * @private
   */
  _isOperatorUnaryMinus(op, idx, stringArr) {
    const prevChar = stringArr[idx - 1];

    return op === UNARY_MINUS &&
      (idx === 0 || BINARY_OPS.has(prevChar) || UNARY_OPS.has(prevChar) || prevChar === '(');
  }
}