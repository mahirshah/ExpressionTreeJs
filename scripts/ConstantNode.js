import ExpressionNode from 'ExpressionNode';

export default class ConstantNode extends ExpressionNode {
  constructor(constant) {
    super();
    this.constant = constant;
  }

  evaluate(context) {
    return context[this.constant] || this.constant;
  }
}