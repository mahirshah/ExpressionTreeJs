'use strict';

define(['exports'], function (exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createElement = createElement;
  exports.debounce = debounce;
  exports.repeat = repeat;

  function createElement(name) {
    var attributes = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var createdElement = document.createElement(name);
    Object.keys(attributes).forEach(function (key) {
      createdElement.setAttribute(key, attributes[key]);
    });

    for (var _len = arguments.length, innerEls = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      innerEls[_key - 2] = arguments[_key];
    }

    innerEls.forEach(function (el) {
      createdElement.appendChild(el);
    });
    return createdElement;
  }

  function debounce(fx, delay) {
    var timer = undefined;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        fx.apply(undefined, arguments);
      }, delay);
    };
  }

  function repeat(str, count) {
    var repeated = '';

    while (count--) {
      repeated += str;
    }

    return repeated;
  }
});