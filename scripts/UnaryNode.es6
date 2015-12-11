import ExpressionNode from 'ExpressionNode';
import { OPERATOR_FUNCTION_MAP } from 'Operators';

export default class UnaryNode extends ExpressionNode {
  constructor(operator, operand) {
    super();
    this.operator = operator;
    this.operand = operand;
  }

  evaluate(context) {
    return OPERATOR_FUNCTION_MAP.get(this.operator)(this.operand.evaluate(context));
  }
}