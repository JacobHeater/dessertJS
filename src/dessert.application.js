/**
@file The class definition for the dessertJS App class. The App class defines the scope of the application context as defined by the element that wraps the application.
Example of an application definition in the markup is <div dsrt-app="my-first-dsrt-app"></div>
@author Jacob Heater
*/
(function () {

    "use strict";

    define([
        './dessert.module',
        './dessert.common',
        "./dessert.httphandlercache",
        "./dessert.cache",
        "./dessert.interfaces"
    ], main);

    /**
     * RequireJS entry point.
     * 
     * @param {Function} $module A constructor that represents dessertJS modules.
     * @param {Object} $common A library of common dessertJS functionality. 
     * @param {Function} $httpHandlerCache A constructor that represents a cache of HTTP response handlers.
     * @param {Function} $cache A constructor that represents a general cache for dessertJS view.
     * @param {Object} $interfaces A set of common interfaces for dessertJS.
     * @returns {Function} A constructor function that represents a dessertJS application.
     */
    function main($module, $common, $httpHandlerCache, $cache, $interfaces) {

        var emptyString = $common.utils.emptyString;
        var utils = $common.utils;

        /**
         * A constructor to build dessertJS Apps.
         * @class
         * @param {String} name The name of the app.
         * @param {Object} dsrt The dessertJS instance that will be used to init the app.
         * @param {Object} $app The jQuery object that represents your application scope.
         */
        function Application(name, dsrt, $app) {
            var modules = {};
            var providers = {
                IDataBindingProvider: null,
                jquery: null
            };
            var componentRegistry = {};
            var tagRegistry = {};
            var elems = [];
            var that = this;
            /**
             * The name of the app
             */
            this.name = name || "";
            /**
             * Adds a new module to the application. A module is an isolated piece of functionality
             * that contains its own MVC logic.
             * @param {String} name The name of the module to add.
             * @param {Object} globals The global variables that can be used to initialize module related pieces.
             * @returns {Object} A new instance of the Module prototype.
             */
            this.module = function (name, onInit, globals) {
                modules[name] = new $module(name, this, undefined, onInit, globals);
                return modules[name];
            };
            /**
             * Allows for getting and removing modules from the app instance.
             */
            this.modules = {
                /**
                 * Gets a module from the applications module cache.
                 * @param {String} name The name of the module to lookup.
                 * @returns {Object} The module instance corresponding to the name.
                 */
                get: function (name) {
                    return modules[name];
                },
                /**
                 * Removes a module from the application module cache.
                 * @param {String} name The name of the module to remove from the module cache.
                 * @returns {Object} The currnet instance of the modules object for chaining.
                 */
                remove: function (name) {
                    delete modules[name];
                    return this;
                },

                /**
                 * Iterates over each module in the application and calls a
                 * handler function.
                 * 
                 * @param {Function} handler The callback to call over each module.
                 * @returns {Object} The current instance of the Application.modules object.
                 */
                each: function (handler) {
                    if (utils.isFunction(handler)) {
                        Object
                            .keys(modules)
                            .forEach(function (key) {
                                handler.call(modules[key], modules[key]);
                            });
                    }

                    return this;
                }
            };
            /**
             * Uses the provided dessertJS instance to initialize the application.
             * @param {Object} args Global arguments to be used to initialize the application.
             * @returns {Object} The current instance of the App prototype for chaining.
             */
            this.init = function (done, args) {
                dsrt.init(this, done, args);
                return this;
            };
            /**
             * Uses the provided dessertJS instance to initialize the single-page application.
             * This init should only be used to init single page applications.
             * @param {Object} args Global arguments to be used to initialize the application.
             * @returns {Object} The current instance of the App prototype for chaining.
             */
            this.pageInit = function (args) {
                dsrt.pageInit(this, args);
                return this;
            };

            this.httpHandlers = {
                page: new $httpHandlerCache()
            };

            var _initalized = false;
            Object.defineProperty(this, "initialized", {
                get: function () {
                    return _initalized;
                },
                set: function (value) {
                    if (typeof value === "boolean") {
                        _initalized = value;
                    }
                }
            });

            this.components = {
                /**
                 * Register a component to this application's component registry.
                 * 
                 * @param {String} components The list of components to add to the application context.
                 * @returns {Object} The current instance of Application.
                 */
                register: function (components) {
                    if ($common.utils.isArray(components)) {
                        components.forEach(function (c) {
                            componentRegistry[c.name] = c.entry;
                        });
                    }
                    return this;
                },
                /**
                 * Gets a component url from the componentRegistry by name.
                 * 
                 * @param {String} name The name of the component.
                 * @returns {String} The url of the component.
                 */
                get: function (name) {
                    return componentRegistry[name];
                },
                /**
                 * Iterates over each components in the application
                 * component cache and calls the handler function.
                 * 
                 * @param {Function} handler The function to call over each component.
                 * @returns {Object} The current instance Application.components.
                 */
                each: function (handler) {
                    if (utils.isFunction(handler)) {
                        var instances = that.cache.componentCache.getHashTable();
                        Object
                            .keys(instances)
                            .forEach(function (key) {
                                handler.call(instances[key], instances[key]);
                            });
                    }

                    return this;
                }
            };

            /**
             * Registers tags to the application instance, so that the application knows that it needs
             * to render out those tags to their respective dessertJS markup.
             * 
             * @param {CutomTag[]} tags The array of CustomTag instances to load into the application tag registry.
             * @returns {Application} The current instance of the Application class.
             */
            this.registerTags = function (tags) {
                if ($common.utils.isArray(tags)) {
                    tags.forEach(function (t) {
                        tagRegistry[t.name] = t;
                    });
                }

                return this;
            };

            /**
             * Iterates over the Application's custom tag registry hash table, and converts the hash table
             * entries into an array CustomTag instances.
             * 
             * @returns {CustomTag[]} The custom tags that were registered to the tag registry.
             */
            this.getCustomTags = function () {
                var arr = [];
                Object.keys(tagRegistry).forEach(function (k) {
                    arr.push(tagRegistry[k]);
                });
                return arr;
            };

            /**
             * dessertJS uses tracking on DOM elements to ensure that views and their event listeners are
             * properly cleaned up when the current view is destroyed. Destruction of the view in dessertJS
             * can happen when the Page URL is changed, or when the View.prototype.destroy() method is
             * explicitly invoked.
             * 
             * @private
             */
            this.trackedElements = {
                /**
                 * Adds a DOM element to track in the Application instance, so that the Application can clean
                 * up each DOM element from the View before initializing the Page.
                 * 
                 * @param {Element} elem The DOM element to be tracked by the Application.
                 * 
                 * @returns {Object} The trackedElements hash table.
                 */
                add: function (elem) {
                    elems.push(elem);

                    return this;
                },
                /**
                 * Destroys all of the DOM elements on the page by ensuring that all
                 * event listeners are removed the DOM elements.
                 */
                destroyAll: function () {
                    elems.forEach(function (elem) {
                        elem.off().off("**");
                        elem.children().off().off("**");
                    });

                    return this;
                }
            };

            /**
             * The DOM element that represents this Application instance. 
             */
            this.$app = $app;

            //Set an immutable providers property on the Application instance.
            Object.defineProperty(this, "providers", {
                writable: false,
                value: {}
            });

            //Define the difference types of providers as immutable properties on
            //the providers hash table.
            Object.defineProperties(this.providers, {
                /**
                 * The IDataBindingProvider should be an instance of the IDataBindingProvider interface as defined
                 * in the dessertJS common interfaces module (dessert.interfaces), and should implement
                 * all of the interface members. 
                 */
                IDataBindingProvider: {
                    /**
                     * Returns the configured IDataBindingProvider provider instance.
                     * 
                     * @returns {IDataBindingProvider} The configured IDataBindingProvider instance.
                     */
                    get: function() {
                        return providers.IDataBindingProvider;
                    },
                    /**
                     * Sets the Application IDataBindingProvider provider.
                     * 
                     * @param {IDataBindingProvider} value The IDataBindingProvider instance.
                     */
                    set: function(value) {
                        if (value && value instanceof $interfaces.IDataBindingProvider) {
                            providers.IDataBindingProvider = value;
                        }
                    }
                },
                /**
                 * dessertJS is built on top of jQuery, but does not require a specific version of
                 * jQuery to operate. This is the configured version of jQuery that should be used
                 * to run dessertJS.
                 */
                jquery: {
                    /**
                     * Returns the configured jQuery provider.
                     * 
                     * @returns {jQuery} jQuery.
                     */
                    get: function() {
                        return providers.jquery;
                    },
                    /**
                     * Sets the jQuery provider for this Application.
                     * 
                     * @param {jQuery} value The desired version of jQuery to use.
                     */
                    set: function(value) {
                        if (value && value.fn && value.fn.jquery) {
                            providers.jquery = value;
                        }
                    }
                }
            });
        };

        /**
         * Sets the different path types that the Application can understand.
         * This currently is implemented in the dessertJS common helper library
         */
        Application.prototype.pathTypes = $common.pathTypes;
        /**
         * An immutable property that has an empty string value.
         * 
         * @returns {String} "".
         */
        Application.prototype.dsrtPath = emptyString;
        /**
         * The path where the templates are stored and should be retrieved from.
         * This should be the top level directory, and all other paths will be relative
         * to that. dessertJS will use the top level directory to construct relative paths
         * to that directory to find the templates for this Application instance.
         */
        Application.prototype.templates = emptyString;
        /**
         * The path where the views are stored and should be retrieved from.
         * This should be the top level directory. All other paths will be relative to
         * this top level directory. The paths used to retrieve the HTML files for views
         * will be constructed using this top level directory.
         */
        Application.prototype.src = emptyString;
        /**
         * A function to call when the [dsrt-mask] attribute is removed when the
         * dessertJS runtime has finished constructing the views.
         */
        Application.prototype.maskLifted = function emptyMaskLifted() {};
        /**
         * A cache for the Application to use to hold various singleton references.
         * 
         * @private
         */
        Application.prototype.cache = new $cache();

        /**
         * An enumeration that helps the cache to track the type of record that is being cached.
         * This property is immutable to prevent it from being overwritten.
         * 
         * @private
         */
        Object.defineProperties(Application.prototype.cache, {
            TYPE: {
                writable: false,
                value: $cache.TYPE
            }
        });

        return Application;
    }
})();