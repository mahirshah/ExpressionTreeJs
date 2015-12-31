import ExpressionNode from 'ExpressionNode';
import { OPERATOR_FUNCTION_MAP, UNARY_MINUS_ALT } from 'Operators';

export default class UnaryNode extends ExpressionNode {
  constructor(operator, operand) {
    super();
    this.operator = operator;
    this.operand = operand;
  }

  /**
   * Recursively evaluates and reduces this unary node to a single value
   * @param {{}} context - the variable context
   * @returns {*} - the evaluated value
   */
  evaluate(context) {
    return OPERATOR_FUNCTION_MAP.get(this.operator)(this.operand.evaluate(context));
  }

  /**
   * Iterates over all constant nodes in the expression tree with the given callback, callback is given constant node as
   * argument
   * @param {Function} callback - function to call on each constant node
   * @param {Object} thisArg - this context for callback. Optional.
   * @returns {void}
   */
  iterate(callback, thisArg = null) {
    this.operand.iterate(callback, thisArg);
  }

  toInfix() {
    if(this.operator === UNARY_MINUS_ALT) {
      return `-${this.operand}`;
    }
    return `${this.operator}(${this.operand})`;
  }
}