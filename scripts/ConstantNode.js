import ExpressionNode from 'ExpressionNode';

export default class ConstantNode extends ExpressionNode {
  constructor(constant) {
    super();
    this.constant = constant;
  }

  /**
   * Recursively evaluates and reduces this constant node to a single value
   * @param {{}} context - the variable context
   * @returns {*} - the evaluated value
   */
  evaluate(context) {
    return +context[this.constant] || this.constant;
  }

  /**
   * Iterates over all constant nodes in the expression tree with the given callback, callback is given constant node as
   * argument
   * @param {Function} callback - function to call on each constant node
   * @param {Object} thisArg - this context for callback. Optional.
   * @returns {void}
   */
  iterate(callback, thisArg = null) {
    callback.call(thisArg, this.constant);
  }

  toInfix() {
    return this.constant;
  }
}