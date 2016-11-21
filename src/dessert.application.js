/**
@file The class definition for the dessertJS App class. The App class defines the scope of the application context as defined by the element that wraps the application.
Example of an application definition in the markup is <div dsrt-app="my-first-dsrt-app"></div>
@author Jacob Heater
*/
(function () {

    "use strict";

    define("dessert.application", [
        'dessert.module',
        'dessert.common',
        "dessert.httphandlercache",
        "dessert.cache",
        "dessert.interfaces"
    ], main);

    /**
     * RequireJS entry point.
     * 
     * @param {Function} $module A constructor that represents dessertJS modules.
     * @param {Object} $common A library of common dessertJS functionality.
     * @param {Function} $httpHandlerCache A constructor that represents a cache of HTTP response handlers.
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
             * TODO: document
             */
            this.registerTags = function (tags) {
                if ($common.utils.isArray(tags)) {
                    tags.forEach(function (t) {
                        tagRegistry[t.name] = t;
                    });
                }
            };

            /**
             * TODO: document
             */
            this.getCustomTags = function () {
                var arr = [];
                Object.keys(tagRegistry).forEach(function (k) {
                    arr.push(tagRegistry[k]);
                });
                return arr;
            };

            this.trackedElements = {
                add: function (elem) {
                    elems.push(elem);

                    return this;
                },
                destroyAll: function () {
                    elems.forEach(function (elem) {
                        elem.off().off("**");
                        elem.children().off().off("**");
                    });
                }
            };

            this.$app = $app;

            Object.defineProperty(this, "providers", {
                writable: false,
                value: {}
            });

            Object.defineProperties(this.providers, {
                IDataBindingProvider: {
                    get: function() {
                        return providers.IDataBindingProvider;
                    },
                    set: function(value) {
                        if (value && value instanceof $interfaces.IDataBindingProvider) {
                            providers.IDataBindingProvider = value;
                        }
                    }
                },
                jquery: {
                    get: function() {
                        return providers.jquery;
                    },
                    set: function(value) {
                        if (value && value.fn && value.fn.jquery) {
                            providers.jquery = value;
                        }
                    }
                }
            });
        };

        Application.prototype.pathTypes = $common.pathTypes;
        Application.prototype.dsrtPath = emptyString;
        Application.prototype.templates = emptyString;
        Application.prototype.src = emptyString;
        Application.prototype.maskLifted = function emptyMaskLifted() {};
        Application.prototype.cache = new $cache();

        Object.defineProperties(Application.prototype.cache, {
            TYPE: {
                writable: false,
                value: $cache.TYPE
            }
        });

        return Application;
    }
})();