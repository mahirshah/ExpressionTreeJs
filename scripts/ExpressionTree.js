import PostfixConverter from 'PostfixConverter';
import BinaryNode from 'BinaryNode';
import UnaryNode from 'UnaryNode';
import ConstantNode from 'ConstantNode';
import { BINARY_OPS, UNARY_OPS } from 'Operators';

export default class ExpressionTree {
  constructor(expressionString = '') {
    this.postfixConverter = new PostfixConverter();
    const postfixStringArray = this.postfixConverter.toPostfix(expressionString);

    this.expressionTree = this._postfixToTree(postfixStringArray);
  }

  /**
   * Coverts a postfix string to an expression tree
   * @param {[]} postfixString - the postfix expression string
   * @return {ExpressionNode} - the root node of the tree
   * @private
   */
  _postfixToTree(postfixString) {
    const operandStack = [];

    postfixString.forEach((op) => {
      if (BINARY_OPS.has(op)) { // the left child of binary node is deeper in the stack, so reverse the operands
        operandStack.push(new BinaryNode(op, ...[operandStack.pop(), operandStack.pop()].reverse()));
      } else if (UNARY_OPS.has(op)) {
        operandStack.push(new UnaryNode(op, operandStack.pop()));
      } else { // if its a number convert it to one, else leave it as a variable
        operandStack.push(new ConstantNode(isNaN(+op) ? op : +op));
      }
    });

    return operandStack.pop();
  }

  getExpressionTree() {
    return this.expressionTree;
  }

  evaluate(context) {
    return this.expressionTree.evaluate(context);
  }

  updateEquation(expressionString) {
    const postfixStringArray = this.postfixConverter.toPostfix(expressionString);

    this.expressionTree = this._postfixToTree(postfixStringArray);
  }
}