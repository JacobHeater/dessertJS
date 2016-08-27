/********************************
@file A wrapper module for making async calls, which returns the promise.
@author Jacob Heater
*********************************/
define([], function() {
  "use strict";
  return {
    get: function(url) {
      return $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        async: true
      });
    }
  }
});
