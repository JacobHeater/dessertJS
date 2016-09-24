/**
 * @file Defines the dessertJS Controller prototype.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.controller", ['jquery'],
    function dessertControllerModule($) {
        
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
        function Controller(name, module, $controller, implementation) {
            this.name = name || "";
            this.module = module;
            this.$controller = $controller;
            this.onInit = $.noop;
            this.constructor = implementation || function emptyControllerConstructor() {};
        };
        return Controller;
    });
})();