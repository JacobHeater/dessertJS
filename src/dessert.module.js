/**
 * @file Defines a dessertJS Module prototype.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.module", [
            'dessert.controller',
            "dessert.common"
        ],
        function dessertModuleModule(Controller, $common) {

            var utils = $common.utils;

            /**
             * A Modules in dessertJS is the highest level element that can be on the page
             * besides the application scope. Each Module represents a scope in dessertJS,
             * and within each Module there can be several Controllers. Each Controller is a
             * scope. Modules are the top level scope where application logic can be grouped
             * together and reused. Modules encourage Controller reuse. This allows application
             * functionality not only to be grouped, but reused.
             * 
             * @class
             * 
             * @param {String} name The name of the module. This must match whatever the value
             * of the dsrt-module attribute value is on the element.
             * @param {Object} app The application scope of which the Module is a child of.
             * @param {Object} $module The jQuery instance that encapsulates the [dsrt-module] element.
             * @param {Object} globals The global variables that need to be shared among Modules.
             */
            function Module(name, app, $module, globals) {

                /**
                 * A cache of all of the controllers this Module is a parent to.
                 */
                var controllers = {};
                this.name = name || "";
                /**
                 * Bootstraps a new Controller singleton instance to be appended to the
                 * controllers cache.
                 * 
                 * @param {String} name The name of the controller to add to the Module.
                 * @param {Function} implementation The constrcutor for the controller.
                 * @returns {Object} The Controller instance.
                 */
                this.controller = function controller(name, implementation) {
                    controllers[name] = new Controller(name, this, app, undefined, implementation);
                    return controllers[name];
                };
                this.controllers = {
                    /**
                     * Gets a Controller instance from the controllers cache
                     * that belongs to this Module instance.
                     * 
                     * @param {String} name The name of the controller to retrieve.
                     * @returns {Object} The controller singleton.
                     */
                    get: function get(name) {
                        return controllers[name];
                    },
                    /**
                     * Removes the Controller singleton instance from the controllers
                     * cache.
                     * 
                     * @param {String} name The name of the controller to remove.
                     * @returns {Objet} The controllers namespace object for chaining.
                     */
                    remove: function remove(name) {
                        delete controllers[name];
                        return this;
                    },

                    /**
                     * Iterates over each controller in the module and
                     * fires the handler function.
                     * 
                     * @param {Function} handler The callback to fire over each controller.
                     * @returns {Object} The current instance of the Module.controllers object.
                     */
                    each: function(handler) {
                        if (utils.isFunction(handler)) {
                            Object
                                .keys(controllers)
                                .forEach(function(key) {
                                    handler.call(controllers[key], controllers[key]);
                                });
                        }

                        return this;
                    }
                };
                this.$module = $module;
                this.globals = globals || {};
                this.app = app;
                this.onInit = function emptyModuleOnInitFunction() {};
                /**
                 * Constructs a path to file for the Module based on the given
                 * pathType and path url.
                 * 
                 * @param {Number} pathType The pathTypes enum member value to lookup.
                 * @param {String} path The path to construct the string out of.
                 * @returns {String} The constructed path.
                 */
                this.getPath = function getPath(pathType, path) {
                    if (pathType === app.pathTypes.src) {
                        return {
                            path: app.src + path + '.html'
                        };
                    } else if (pathType === app.pathTypes.templates) {
                        return {
                            path: app.templates + path + '.html'
                        };
                    }
                };
                /**
                 * Creates a dsrt-src path from the given url using the
                 * pathTypes.src enum member value.
                 * 
                 * @param {String} path The path used to construct the absolute path.
                 * @returns {String} The fully constructed path.
                 */
                this.src = function src(path) {
                    return this.getPath(app.pathTypes.src, path);
                };
                /**
                 * Creates a template url from the given url using the
                 * pathTypes.templates enum member value.
                 * 
                 * @param {String} path The path used to construct the absolute path.
                 * @returns {String} The fully constructed path.
                 */
                this.template = function template(path) {
                    return this.getPath(app.pathTypes.templates, path);
                }
            };
            return Module;
        });


})();