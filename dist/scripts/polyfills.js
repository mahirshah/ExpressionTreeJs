'use strict';

define([], function () {
  if (!String.prototype.repeat) {
    String.prototype.repeat = function (count) {
      var repeatedString = '';

      for (var i = 0; i < count; i++) {
        repeatedString += this;
      }

      return this + repeatedString;
    };
  }
});