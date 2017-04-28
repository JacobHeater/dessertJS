/**
 * @file Defines the AJAX helper module for the dessertJS framework.
 * @since 04/15/2017
 * @author Jacob Heater
 */
(function () {
    
  'use strict';

  const AJAX = {
    get: get
  };

  const STATUS_OK = 200;

  var $Promise;
  var UrlHelper;

  define(
    [
      'helpers/promise',
      'helpers/url-helper'
    ],
    main
  );

  /**
   * The entry point for the AJAX Helper object.
   * 
   * @param {$Promise} _Promise The $Promise prototype for handling asynchronous tasks.
   * @param {UrlHelper} UrlHelper The helper for constructing and manipulating URLs in dessertJS.
   * @returns {Object} The AJAX helper object.
   */
  function main(
    _Promise,
    $UrlHelper
  ) {
    $Promise = _Promise;
    UrlHelper = $UrlHelper;

    return AJAX;
  }

  /**
   * Does an HTTP GET request to the specific resource.
   * 
   * @param {String} url The URL of the resource.
   * @param {Object=} options An optional set of configuration for the GET call.
   */
  function get(url, options = {}) {
    return XHR(Object.assign({
      method: 'GET',
      url: url
    }, options));
  }

  /**
   * Performs an XMLHttpRequest to the given resource using a
   * set of configuration for the request.
   * 
   * @param {Object} options Configuration for the XMLHttpRequest.
   * @returns {$Promise} The promise for handling XHR events.
   */
  function XHR(options) {
    var xhr = new XMLHttpRequest();
    var promise = new $Promise();
    var config = Object.assign({
      url: '',
      method: '',
      data: null,
      cache: false
    }, options);

    if (!config.cache) {
      config.url = UrlHelper.addQueryString(config.url, {
        noCache: Math.floor(Math.random() * 9999999999) + 1
      });
    }

    xhr.addEventListener('error', e => promise.reject(e));

    xhr.addEventListener('load', e => xhr.status === STATUS_OK ?
      promise.resolve(/.json/.test(config.url) ? tryAsJson(xhr.responseText) : xhr.responseText) :
      promise.reject(xhr));

    xhr.timeout = 60000;
    xhr.open(config.method, config.url, true);

    if (config.method === 'POST') {
      xhr.send(config.data);
    } else {
      xhr.send();
    }

    return promise;
  }

  /**
   * Attempts to parse the response text as JSON, and if it fails,
   * just returns the response text as is.
   * 
   * @param {String} responseText The responseText of the XHR instance.
   * @returns {Object|String} Either the parsed JSON or the responseText.
   */
  function tryAsJson(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (e) {
      return responseText;
    }
  }
})();