/**************************
@file The class definition for the muvJS App class. The App class defines the scope of the application context as defined by the element that wraps the application.
Example of an application definition in the markup is <div muv-app="my-first-muv-app"></div>
@author Jacob Heater
***************************/
﻿define(['./muv.module', './muv.common'], function (Module, Common) {
    "use strict";

    var emptyString = Common.utils.emptyString;

    /**
     * A constructor to build muvJS Apps.
     * @class
     * @param {String} name The name of the app.
     * @param {Object} muv The muvJS instance that will be used to init the app.
     * @param {Object} $app The jQuery object that represents your application scope.
     */
    function App(name, muv, $app) {
        var modules = {};
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
        this.module = function (name, globals) {
            modules[name] = new Module(name, this, globals);
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
            }
        };
        /**
         * Uses the provided muvJS instance to initialize the application.
         * @param {Object} args Global arguments to be used to initialize the application.
         * @returns {Object} The current instance of the App prototype for chaining.
         */
        this.init = function(done, args) {
          muv.init(done, args);
          return this;
        };
        /**
         * Uses the provided muvJS instance to initialize the single-page application.
         * This init should only be used to init single page applications.
         * @param {Object} args Global arguments to be used to initialize the application.
         * @returns {Object} The current instance of the App prototype for chaining.
         */
        this.pageInit = function(args) {
          muv.pageInit(args);
          return this;
        };
        this.$app = $app;
    };

    App.prototype.pathTypes = Common.pathTypes;
    App.prototype.muvPath = emptyString;
    App.prototype.templates = emptyString;
    App.prototype.src = emptyString;

    return App;
});
