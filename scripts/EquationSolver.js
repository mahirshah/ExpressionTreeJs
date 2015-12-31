import ConstantNode from 'ConstantNode';
import UnaryNode from 'UnaryNode';
import { OPERATOR_INVERSE_MAP } from 'Operators';

export default class EquationSolver {
  constructor(expressionTree1, expressionTree2, context = {}) {
    this.expressionTree1 = expressionTree1;
    this.expressionTree2 = expressionTree2;
    this.context = context;
    this.numUnknowns = 0;
    this.unknownTree = expressionTree1.getExpressionTree();
    this.knownTree = expressionTree2.getExpressionTree();
    this.knownTreeStack = [];
    this.unknownTreeStack = [];

    expressionTree1.getExpressionTree().iterate((constant) => {
      if (isNaN(constant) && !context[constant]) {
        this.numUnknowns += 1;
      }
    });

    expressionTree2.getExpressionTree().iterate((constant) => {
      if (isNaN(constant) && !context[constant]) {
        this.numUnknowns += 1;
        this.unknownTree = this.expressionTree2.getExpressionTree();
        this.knownTree = this.expressionTree2.getExpressionTree();
      }
    });
  }

  evaluate() {
    if (this.numUnknowns === 0) { // if no unknowns simply check for equality
      return this.expressionTree1.evaluate(this.context) === this.expressionTree2.evaluate(this.context);
    } else if (this.numUnknowns > 1) {
      throw new Error('Too many unknowns');
    }

    while (!this._doStepOfAlegbra()) {
      this.unknownTreeStack.push(this.unknownTree.toInfix());
      this.knownTreeStack.push(this.knownTree.toInfix());
    }

    return `${this.unknownTree.toInfix()} = ${this.knownTree.toInfix()}`;
  }

  /**
   * TODO: non-commutative operators need to be handled
   * Does a single step of algebra towards solving for the unknown. Returns true upon completion, else returns false.
   * @returns {boolean} - Have we completely solved for the unknown? (Isolated the unknown)
   * @private
   */
  _doStepOfAlegbra() {
    if (this.unknownTree instanceof ConstantNode) {
      return true;
    } else if (this.unknownTree instanceof UnaryNode) {
      this.knownTree = OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree);
      this.unknownTree = this.unknownTree.operand;
    } else if (this.unknownTree.left.isUnknown(this.context)) { // left sub-tree contains unknown
      this.knownTree = OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree, this.unknownTree.right);
      this.unknownTree = this.unknownTree.left;
    } else { // right sub-tree contains unknown
      this.knownTree = OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree, this.unknownTree.left);
      this.unknownTree = this.unknownTree.right;
    }

    return false;
  }

}
