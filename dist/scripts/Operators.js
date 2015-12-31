'use strict';

define(['exports', 'BinaryNode', 'UnaryNode', 'ConstantNode'], function (exports, _BinaryNode, _UnaryNode, _ConstantNode) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.OPERATOR_INVERSE_MAP = exports.OPERATOR_FUNCTION_MAP = exports.PRECEDENCE = exports.PARENS = exports.UNARY_OPS = exports.BINARY_OPS = exports.UNARY_MINUS_ALT = exports.UNARY_MINUS = undefined;

  var _BinaryNode2 = _interopRequireDefault(_BinaryNode);

  var _UnaryNode2 = _interopRequireDefault(_UnaryNode);

  var _ConstantNode2 = _interopRequireDefault(_ConstantNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var UNARY_MINUS = exports.UNARY_MINUS = '-';
  var UNARY_MINUS_ALT = exports.UNARY_MINUS_ALT = '#';
  var BINARY_OPS = exports.BINARY_OPS = new Set(['^', '*', '/', '-', '+']);
  var UNARY_OPS = exports.UNARY_OPS = new Set([UNARY_MINUS_ALT, 'ln', 'sqrt']);
  var PARENS = exports.PARENS = new Set(['(', ')']);
  var PRECEDENCE = exports.PRECEDENCE = new Map([[UNARY_MINUS_ALT, 4], ['ln', 4], ['sqrt', 4], ['^', 3], ['*', 2], ['/', 2], ['+', 1], ['-', 1]]);
  var OPERATOR_FUNCTION_MAP = exports.OPERATOR_FUNCTION_MAP = new Map([['^', function (a, b) {
    return Math.pow(a, b);
  }], ['*', function (a, b) {
    return a * b;
  }], ['/', function (a, b) {
    return a / b;
  }], ['-', function (a, b) {
    return a - b;
  }], ['+', function (a, b) {
    return a + b;
  }], [UNARY_MINUS_ALT, function (a) {
    return -a;
  }], ['ln', Math.log], ['sqrt', Math.sqrt]]);
  var OPERATOR_INVERSE_MAP = exports.OPERATOR_INVERSE_MAP = new Map([['^', function (known, unknown) {
    return new _BinaryNode2.default('^', known, new _BinaryNode2.default('/', new _ConstantNode2.default(1), unknown));
  }], ['*', function (known, unknown) {
    return new _BinaryNode2.default('/', known, unknown);
  }], ['/', function (known, unknown) {
    return new _BinaryNode2.default('*', known, unknown);
  }], ['-', function (known, unknown) {
    return new _BinaryNode2.default('+', known, unknown);
  }], ['+', function (known, unknown) {
    return new _BinaryNode2.default('-', known, unknown);
  }], [UNARY_MINUS_ALT, function (known) {
    return new _UnaryNode2.default(UNARY_MINUS_ALT, known);
  }], ['ln', function (known) {
    return new _BinaryNode2.default('^', new _ConstantNode2.default(Math.E), known);
  }], ['sqrt', function (known) {
    return new _BinaryNode2.default('^', known, new _ConstantNode2.default(2));
  }]]);
});