/**
 * @file A module that exposes common methods that are shared througouht the muvJS framework. 
 * This common module contains mostly helper methods and common variables.
 * @author Jacob Heater 
 */
define(function() {
    "use strict";
    var attrs = {
        app: 'muv-app',
        module: 'muv-module',
        controller: 'muv-controller',
        view: 'muv-view',
        control: 'muv-control',
        model: 'muv-model',
        mask: 'muv-mask',
        src: 'muv-src',
        rpt: 'muv-repeat',
        page: 'muv-page'
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