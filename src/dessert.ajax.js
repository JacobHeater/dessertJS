/**
 * @file A wrapper module for making async calls, which returns the promise.
 * @author Jacob Heater
 */
(function() {
  
  "use strict";

  define("dessert.ajax", ['jquery'], main);

  /**
   * Require entry point.
   * 
   * @returns {Object} An object that exposes ajax capabilities.
   */
  function main($) {

    return {
      /**
       * Does an AJAX get and returns a promise.
       * @param {String} url The url to perform HTTP GET on.
       * @returns {Object} A promise from the AJAX call.
       */
      get: function(url) {
        return $.ajax({
          type: 'GET',
          url: url,
          cache: false,
          async: true
        });
      },
      /**
       * Does an AJAX POST and returns a promise.
       * @param {String} url The url to perform the HTTP POST on.
       * @returns {Object} A promise from the AJAX call.
       */
      post: function(url, data) {
        return $.ajax({
          type: "POST",
          url: url,
          cache: false,
          async: true,
          data: data,
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });
      }
    }
  }
})();