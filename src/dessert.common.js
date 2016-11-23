/**
 * @file A module that exposes common methods that are shared througouht the dessertJS framework. 
 * This common module contains mostly helper methods and common variables.
 * @author Jacob Heater 
 */
(function() {

    "use strict";

    define(dessertCommonModule);

    /**
     * RequireJS entry point.
     * 
     * @returns {Object} An object that exposes common dessertJS functionality.
     */
    function dessertCommonModule() {

        /**
         * Defines a read only property on the given object with the given value.
         * 
         * @param {Object} obj The object to add the read only property to.
         * @param {String} propertyName The name of the read only property.
         * @param {any} propertyValue The value of the read only property.
         */
        function defineReadOnlyProperty(obj, propertyName, propertyValue) {
            Object.defineProperty(obj, propertyName, {
                writable: false,
                value: propertyValue
            });
        }

        /**
         * Defines a set of read only properties on the given object.
         * 
         * @param {Object} obj The object to add the read only properties to.
         * @param {Object} dictionary The properties dictionary that contains the name of the property and the value.
         */
        function defineReadOnlyProperties(obj, dictionary) {
            if (typeof dictionary === "object") {
                Object
                .keys(dictionary)
                .forEach(function propsDictionaryKeysForEach(key) {
                    defineReadOnlyProperty(obj, key, dictionary[key]);
                });
            }
        }

        /**
         * Attributes that are used to describe html entities.
         */
        var attrs = {};

        defineReadOnlyProperties(attrs, {
            app: 'dsrt-app',
            module: 'dsrt-module',
            controller: 'dsrt-controller',
            view: 'dsrt-view',
            component: 'dsrt-component',
            control: 'dsrt-control',
            controlGroup: 'dsrt-control-group',
            model: 'dsrt-model',
            mask: 'dsrt-mask',
            src: 'dsrt-src',
            rpt: 'dsrt-repeat',
            page: 'dsrt-page',
            id: "id"
        });

        /**
         * Selectors that are used in conjunction with the above attributes
         * to find matching dessertJS DOM elements.
         */
        var selectors = {};

        defineReadOnlyProperties(selectors, {
            app: '[$app]'.replace('$app', attrs.app),
            module: '[$module]'.replace('$module', attrs.module),
            controller: '[$controller]'.replace('$controller', attrs.controller),
            view: '[$view]'.replace('$view', attrs.view),
            component: '[$component]'.replace("$component", attrs.component),
            control: '[$control]'.replace('$control', attrs.control),
            controlGroup: '[$controlGroup]'.replace('$controlGroup', attrs.controlGroup),
            model: '[$model]'.replace('$model', attrs.model),
            mask: '[$mask]'.replace('$mask', attrs.mask),
            src: '[$src]'.replace('$src', attrs.src),
            rpt: '[$rpt]'.replace('$rpt', attrs.rpt),
            page: '[$page]'.replace('$page', attrs.page),
            id: "[$id]".replace("$id", attrs.id)
        });

        /**
         * A collection of regular expressions to be shared commonly.
         */
        var regex = {};

        /**
         * Defines the different path types in dessertJS.
         */
        var pathTypes = {};

        defineReadOnlyProperties(pathTypes, {
            src: 1,
            templates: 2
        });

        /**
         * A common utilities library for dessertJS.
         */
        var utils = {};

        defineReadOnlyProperties(utils, {
            emptyString: "",
            noop: function() {},
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

            /**
             * Cleans the given path of any illegal characters.
             * 
             * @param {String} path The path to clean.
             * @returns {String} The cleaned path.
             */
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
            },

            /**
             * Gets the attributes from a jQuery object and returns them as a map.
             * 
             * @param {Object} elem The jQuery object to get the attributes of.
             * @param {Array.<string>} exclude The list of attrs to exclude.
             * @returns {Object} The attribute map.
             */
            getElementAttrs: function(elem, exclude) {
                var attrMap = {};
                exclude = this.isArray(exclude) ? exclude : [];
                if (elem) {
                    var nativeElem = elem.get(0);
                    if (nativeElem) {
                        var nativeAttrs = nativeElem.attributes;
                        if (nativeAttrs.length) {
                            Object.keys(nativeAttrs).forEach(function(key) {
                                var attr = nativeAttrs[key];
                                if (typeof attr.nodeValue !== "undefined" && attr.nodeName && exclude.indexOf(attr.nodeName) === -1) {
                                    attrMap[attr.nodeName] = attr.nodeValue;
                                }
                            });
                        }
                    }
                }
                return attrMap;
            },

            /**
             * Determines if the given object is of typeof "object."
             * 
             * @param {Object} ref The object to check.
             * @returns {Boolean} True if is of type "object."
             */
            isObject: function(ref) {
                return typeof ref === "object";
            },

            /**
             * Determines if the given value is typeof "function".
             * 
             * @param {function} fn The object to check.
             * @returns {Boolean} True if is typeof "function".
             */
            isFunction: function(fn) {
                return typeof fn === "function";
            },

            /**
             * Determines if the given object is an array.
             * 
             * @param {Object} arr The object to inspect.
             * @returns {Boolean} True if it is an array.
             */
            isArray: function(arr) {
                return Array.isArray(arr);
            },

            /**
             * Determines if the given value is of type string.
             * 
             * @param {String} str The object to check the type of.
             * @returns {Boolean} True if the object is a string.
             */
            isString: function(str) {
                return typeof str === "string";
            },

            addReadOnlyProperty: function(obj, propName, value) {
                defineReadOnlyProperty(obj, propName, value);

                return this;
            },

            addReadOnlyProperties: function(obj, hash) {
                defineReadOnlyProperties(obj, hash);

                return this;
            },

            defer: function(action, args) {
                args = args && Array.isArray(args) ? args : [];
                if (this.isFunction(action)) {
                    setTimeout(function() {
                        action.apply(null, args);
                    }, 0);
                }
            }
        });

        return {
            attrs: attrs,
            selectors: selectors,
            regex: regex,
            utils: utils,
            pathTypes: pathTypes
        };
    }
})();