/**
 * @file A module that exposes common methods that are shared througouht the dessertJS framework. 
 * This common module contains mostly helper methods and common variables.
 * @author Jacob Heater 
 */
define(function() {
    
    "use strict";

    var attrs = {
        app: 'dsrt-app',
        module: 'dsrt-module',
        controller: 'dsrt-controller',
        view: 'dsrt-view',
        control: 'dsrt-control',
        model: 'dsrt-model',
        mask: 'dsrt-mask',
        src: 'dsrt-src',
        rpt: 'dsrt-repeat',
        page: 'dsrt-page'
    };
    
    var selectors = {
        app: '[$app]'.replace('$app', attrs.app),
        module: '[$module]'.replace('$module', attrs.module),
        controller: '[$controller]'.replace('$controller', attrs.controller),
        view: '[$view]'.replace('$view', attrs.view),
        control: '[$control]'.replace('$control', attrs.control),
        model: '[$model]'.replace('$model', attrs.model),
        mask: '[$mask]'.replace('$mask', attrs.mask),
        src: '[$src]'.replace('$src', attrs.src),
        rpt: '[$rpt]'.replace('$rpt', attrs.rpt),
        page: '[$page]'.replace('$page', attrs.page)
    };
    
    var regex = {};
    
    var pathTypes = {
        src: 1,
        templates: 2
    };
    
    var utils = {
        /**
         * Gets the outer html of the given jQuery element. 
         * @param {Object} $context The jQuery instance to get the outer html of.
         */
        getOuterHtml: function($context) {
            var elem = $context;
            var wrapped = elem.wrap('<div />');
            var html = wrapped.parent().html();
            elem.unwrap('<div />');
            return html;
        },
        cleanPath: function(path) {
            var protocol = /[a-z]+:\/\//gmi;
            var duplFwdSlash = /\/\//gmi;
            var pathSplit = path.split(protocol);
            var pathLeft = "";
            var pathRight = "";
            if (pathSplit.length > 1) {
                pathLeft = pathSplit[0];
                pathRight = pathSplit[1];
                pathRight = pathRight.replace(duplFwdSlash, '/');
            } else {
                pathLeft = pathSplit[0];
                pathLeft = pathLeft.replace(duplFwdSlash, '/');
            }
            return pathLeft + pathRight;
        },
        /**
         * Parses a query string from the given path using a ? separator.
         * 
         * @param {String} path The path to parse.
         * @returns {Object} A hash table of key value pairs.
         */
        parseQueryString: function(path) {
            var obj = {};
            if (path && path.indexOf("?") > -1) {
                var pathSplit = path.split("?");
                var qStr = pathSplit[1];
                var pairs = qStr.split("&");
                pairs.forEach(function(p) {
                    var kvp = p.split("=");
                    var key = kvp[0];
                    var value = kvp[1];
                    try {
                        value = JSON.parse(value);
                    } catch (err) {
                        value = kvp[1];
                    }
                    obj[key] = value;
                });
            }
            return obj;
        },
        /**
         * Cleans the query string from the path using the ? separator.
         * 
         * @param {String} path The path to clean.
         * @returns {String} The cleaned path.
         */
        cleanQueryString: function(path) {
            return path ? path.split("?")[0] : path;
        }
    };

    /**
     * Set a read-only constant value for an empty string.
     */
    Object.defineProperty(utils, "emptyString", {
        writable: false,
        value: ""
    });

    return {
        attrs: attrs,
        selectors: selectors,
        regex: regex,
        utils: utils,
        pathTypes: pathTypes
    };
});