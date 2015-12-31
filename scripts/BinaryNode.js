import ExpressionNode from 'ExpressionNode';
import { OPERATOR_FUNCTION_MAP } from 'Operators';

export default class BinaryNode extends ExpressionNode {
  constructor(operator, left = 0, right = 0) {
    super();
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  /**
   * Recursively evaluates and reduces this binary node to a single value
   * @param {{}} context - the variable context
   * @returns {*} - the evaluated value
   */
  evaluate(context) {
    return OPERATOR_FUNCTION_MAP.get(this.operator)(this.left.evaluate(context), this.right.evaluate(context));
  }

  /**
   * Iterates over all constant nodes in the expression tree with the given callback, callback is given constant node as
   * argument
   * @param {Function} callback - function to call on each constant node
   * @param {Object} thisArg - this context for callback. Optional.
   * @returns {void}
   */
  iterate(callback, thisArg = null) {
    this.left.iterate(callback, thisArg);
    this.right.iterate(callback, thisArg);
  }

  toInfix() {
    return `(${this.left.toInfix()}${this.operator}${this.right.toInfix()})`;
  }
}