// we use the symbol '#' to replace unary '-'
export const UNARY_MINUS = '-';
export const UNARY_MINUS_ALT = '#';

export const BINARY_OPS = new Set(['^', '*', '/', '-', '+']);
export const UNARY_OPS = new Set([UNARY_MINUS_ALT, 'ln']);
export const PARENS = new Set(['(', ')']);

/**
 * Maps each operator to its precedence
 * @type {Map}
 */
export const PRECEDENCE = new Map([
  [UNARY_MINUS_ALT, 4],
  ['ln', 4],
  ['sqrt', 4],
  ['^', 3],
  ['*', 2],
  ['/', 2],
  ['+', 1],
  ['-', 1]
]);

/**
 * Maps each operator to its calculating function
 * @type {Map}
 */
export const OPERATOR_FUNCTION_MAP = new Map([
  ['^', (a, b) => Math.pow(a, b)],
  ['*', (a, b) => a * b],
  ['/', (a, b) => a / b],
  ['-', (a, b) => a - b],
  ['+', (a, b) => a + b],
  [UNARY_MINUS_ALT, (a) => -a],
  ['ln', Math.log],
  ['sqrt', Math.sqrt]
]);