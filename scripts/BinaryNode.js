import ExpressionNode from 'ExpressionNode';
import { OPERATOR_FUNCTION_MAP } from 'Operators';

export default class BinaryNode extends ExpressionNode {
  constructor(operator, left = 0, right = 0) {
    super();
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  evaluate(context) {
    return OPERATOR_FUNCTION_MAP.get(this.operator)(this.left.evaluate(context), this.right.evaluate(context));
  }
}