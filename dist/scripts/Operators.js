'use strict';

define(['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var UNARY_MINUS = exports.UNARY_MINUS = '-';
  var UNARY_MINUS_ALT = exports.UNARY_MINUS_ALT = '#';
  var BINARY_OPS = exports.BINARY_OPS = new Set(['^', '*', '/', '-', '+']);
  var UNARY_OPS = exports.UNARY_OPS = new Set([UNARY_MINUS_ALT, 'ln']);
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
});