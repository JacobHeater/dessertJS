/**
 * @file A wrapper module for making async calls, which returns the promise.
 * @author Jacob Heater
 */
(function() {
  
  "use strict";

  define(main);

  /**
   * Require entry point.
   * 
   * @returns {Object} An object that exposes ajax capabilities.
   */
  function main() {

    return {
      jquery: undefined,
      /**
       * Does an AJAX get and returns a promise.
       * @param {String} url The url to perform HTTP GET on.
       * @returns {Object} A promise from the AJAX call.
       */
      get: function(url) {
        return this.jquery.ajax({
          type: 'GET',
          url: url,
          cache: true,
          async: true
        });
      },
      /**
       * Does an AJAX POST and returns a promise.
       * @param {String} url The url to perform the HTTP POST on.
       * @returns {Object} A promise from the AJAX call.
       */
      post: function(url, data) {
        return this.jquery.ajax({
          type: "POST",
          url: url,
          cache: true,
          async: true,
          data: data,
          contentType: "application/json; charset=utf-8",
          dataType: "json"
        });
      }
    }
  }
})();