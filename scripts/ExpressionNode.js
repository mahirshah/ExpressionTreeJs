export default class ExpressionNode {

  /**
   * Returns true or false depending on if an unknown variable is in this tree
   * @param {Object} context - the variable context
   * @returns {boolean} - is there an unknown variable in this tree?
   */
  isUnknown(context) {
    let isUnknown = false;

    this.iterate((constant) => {
      if (isNaN(constant) && !context[constant]) {
        isUnknown = true;
      }
    });

    return isUnknown;
  }
}
