/**
 * @file Defines the dessertJS Controller prototype.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define("dessert.controller", ["dessert.interfaces"], function dessertControllerModule(interfaces) {

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

            this.name = name || "";
            this.module = module;
            this.app = app;
            this.$controller = $controller;
            this.onInit = function emptyInitFunction() {};
            this.constructor = implementation || function emptyControllerConstructor() {};
            this.constructor.prototype.scope = function emptyScopeFunction() {};
            this.constructor.prototype.destroy = function emptyDestroyFunction() {};
            this.constructor.prototype.init = function emptyControllerInit() {};
            this.constructor.prototype.isAsync = false;
            this.constructor.prototype.asyncInit = function emptyControllerAsyncInit() {};
            this.constructor.prototype.initData = function () {
                return {};
            };
            Object.defineProperties(this.constructor.prototype, {
                ready: {
                    writable: false,
                    value: function controllerReady(callback) {
                        if (typeof callback === "function") {
                            _readyCallbacks.push(callback);
                        }
                        return this;
                    }
                },
                notify: {
                    writable: false,
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
                    value: function dataBind(view) {
                        if (app && app.providers && app.providers.IDataBindingProvider instanceof interfaces.IDataBindingProvider) {
                            var output = app.providers.IDataBindingProvider.bindTemplateToData(view, this.initData());
                            return output;
                        }
                        return view;
                    }
                },
                isAsync: {
                    get: function getIsAsync() {
                        return _isControllerAsync;
                    },
                    set: function setIsAsync(value) {
                        if (typeof value === "boolean") {
                            _isControllerAsync = value;
                        }
                    }
                },
                bindTemplateToData: {
                    writable: false,
                    value: function bindTemplateToData(template, data) {
                        if (app && app.providers && app.providers.IDataBindingProvider instanceof interfaces.IDataBindingProvider) {
                            template = app.providers.IDataBindingProvider.bindTemplateToData(template, data);
                        }
                        return template;
                    }
                }
            });
            this.instance = null;
        };
        return Controller;
    });
})();