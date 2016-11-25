/**
 * @file Defines the dessertJS Controller prototype.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define(
        /**
         * The module that exposes the dessertJS Controller prototype.
         * 
         * @returns {Controller} The dessertJS Controller prototype.
         */
        function dessertControllerModule() {

        /**
         * The dessertJS controller is what drives the logic of the modules. Modules are
         * collections of controllers. The controllers are responsible for driving their
         * respective functionality.
         * 
         * @class
         * 
         * @param {String}    name          The name of the controller. This name should match up with
         *                                  with the [dsrt-controller] on the DOM element. When the
         *                                  dessertJS parser parses the modules, it will match up controllers
         *                                  by name, which will be the value of the [dsrt-controller] attribute.
         * @param {Object}   $controller    The jQuery instance that correlates with this dessertJS controller instance.
         * @param {Function} implementation The controller constructor that will be called when the view initialization has
         *                                  completed.
         */
        function Controller(name, module, app, $controller, implementation) {
            var _readyCallbacks = [];
            var _isControllerAsync = false;

            /**
             * The name of the controller.
             */
            this.name = name || "";
            /**
             * The Module that this Controller instance belongs to.
             */
            this.module = module;
            /**
             * The Application instance that this Controller instance belongs to.
             */
            this.app = app;
            /**
             * The DOM element that represents this Controller instance.
             */
            this.$controller = $controller;
            /**
             * The function that is called when the Controller is initialized.
             */
            this.onInit = function emptyInitFunction() {};
            /**
             * The constructor that encapsulates the Controller logic. 
             * 
             * @abstract
             */
            this.constructor = implementation || function emptyControllerConstructor() {};
            /**
             * A function that sets the scope of this Controller instance.
             * 
             * @abstract
             */
            this.constructor.prototype.scope = function emptyScopeFunction() {};
            /**
             * A function that destroys this Controller instance.
             * 
             * @abstract
             */
            this.constructor.prototype.destroy = function emptyDestroyFunction() {};
            /**
             * Controllers are singletons, and when they're constructed, the constructor won't be called
             * again. Therefore, all initialization logic should be placed in the init method.
             * 
             * @abstract
             */
            this.constructor.prototype.init = function emptyControllerInit() {};
            /**
             * Returns a data object that should be used for view data binding.
             * 
             * @abstract
             * 
             * @returns {Object} The data object to use for data binding.
             */
            this.constructor.prototype.initData = function () {
                return {};
            };
            //Immutable properties to be added to the Controller constructor.
            Object.defineProperties(this.constructor.prototype, {
                ready: {
                    writable: false,
                    /**
                     * Pushes callbacks intot he private callback array that
                     * will be invoked sequentially when the controller is ready.
                     */
                    value: function controllerReady(callback) {
                        if (typeof callback === "function") {
                            _readyCallbacks.push(callback);
                        }
                        return this;
                    }
                },
                notify: {
                    writable: false,
                    /**
                     * Notifies the controller that everything has been initialized, and
                     * async loading of the controller can begin.
                     */
                    value: function controllerReadyNotify() {
                        var that = this;

                        _readyCallbacks.forEach(function(callback) {
                            callback.call(that, that);
                        });

                        _readyCallbacks.length = 0;
                    }
                },
                dataBind: {
                    writable: false,
                    /**
                     * Binds the controller data from initData() into the view using
                     * the configured data binding tool.
                     * 
                     * @param {View} view The View that is to be bound.
                     * @returns {Object} The databound view.
                     */
                    value: function dataBind(view) {
                        if (app.providers.IDataBindingProvider) {
                            var output = app.providers.IDataBindingProvider.bindTemplateToData(view, this.initData());
                            return output;
                        }
                        return view;
                    }
                },
                isAsync: { 
                    /**
                     * Returns the value indicating if the controller is to be loaded
                     * asynchronously or not.
                     * 
                     * @returns {Boolean} The flag indicating if the controller is async or not.
                     */
                    get: function getIsAsync() {
                        return _isControllerAsync;
                    },
                    /**
                     * Sets the value indicating if the controller is to be loaded
                     * asynchronously or not.
                     * 
                     * @param {Boolean} value The value to set the flag to.
                     */
                    set: function setIsAsync(value) {
                        if (typeof value === "boolean") {
                            _isControllerAsync = value;
                        }
                    }
                },
                bindTemplateToData: {
                    writable: false,
                    /**
                     * Binds the given template to the provided data object.
                     * 
                     * @param {String} template The template to bind the data to.
                     * @param {Object} data The data to bind to the template.
                     * 
                     * @returns {String} The data bound template.
                     */
                    value: function bindTemplateToData(template, data) {
                        if (app.providers.IDataBindingProvider) {
                            template = app.providers.IDataBindingProvider.bindTemplateToData(template, data);
                        }
                        return template;
                    }
                }
            });
            /**
             * The singleton instance to return if the controller is already
             * instantiated.
             * 
             * @private
             */
            this.instance = null;
        };
        return Controller;
    });
})();