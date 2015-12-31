'use strict';

define(['exports', 'ConstantNode', 'UnaryNode', 'Operators'], function (exports, _ConstantNode, _UnaryNode, _Operators) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _ConstantNode2 = _interopRequireDefault(_ConstantNode);

  var _UnaryNode2 = _interopRequireDefault(_UnaryNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = (function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  })();

  var EquationSolver = (function () {
    function EquationSolver(expressionTree1, expressionTree2) {
      var _this = this;

      _classCallCheck(this, EquationSolver);

      var context = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
      this.expressionTree1 = expressionTree1;
      this.expressionTree2 = expressionTree2;
      this.context = context;
      this.numUnknowns = 0;
      this.unknownTree = expressionTree1.getExpressionTree();
      this.knownTree = expressionTree2.getExpressionTree();
      this.knownTreeStack = [];
      this.unknownTreeStack = [];
      expressionTree1.getExpressionTree().iterate(function (constant) {
        if (isNaN(constant) && !context[constant]) {
          _this.numUnknowns += 1;
        }
      });
      expressionTree2.getExpressionTree().iterate(function (constant) {
        if (isNaN(constant) && !context[constant]) {
          _this.numUnknowns += 1;
          _this.unknownTree = _this.expressionTree2.getExpressionTree();
          _this.knownTree = _this.expressionTree2.getExpressionTree();
        }
      });
    }

    _createClass(EquationSolver, [{
      key: 'evaluate',
      value: function evaluate() {
        if (this.numUnknowns === 0) {
          return this.expressionTree1.evaluate(this.context) === this.expressionTree2.evaluate(this.context);
        } else if (this.numUnknowns > 1) {
          throw new Error('Too many unknowns');
        }

        while (!this._doStepOfAlegbra()) {
          this.unknownTreeStack.push(this.unknownTree.toInfix());
          this.knownTreeStack.push(this.knownTree.toInfix());
        }

        return this.unknownTree.toInfix() + ' = ' + this.knownTree.toInfix();
      }
    }, {
      key: '_doStepOfAlegbra',
      value: function _doStepOfAlegbra() {
        if (this.unknownTree instanceof _ConstantNode2.default) {
          return true;
        } else if (this.unknownTree instanceof _UnaryNode2.default) {
          this.knownTree = _Operators.OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree);
          this.unknownTree = this.unknownTree.operand;
        } else if (this.unknownTree.left.isUnknown(this.context)) {
          this.knownTree = _Operators.OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree, this.unknownTree.right);
          this.unknownTree = this.unknownTree.left;
        } else {
          this.knownTree = _Operators.OPERATOR_INVERSE_MAP.get(this.unknownTree.operator)(this.knownTree, this.unknownTree.left);
          this.unknownTree = this.unknownTree.right;
        }

        return false;
      }
    }]);

    return EquationSolver;
  })();

  exports.default = EquationSolver;
});