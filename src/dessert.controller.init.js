/**
 * @file Initializes the dessertJS controllers in the application context.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.controller.init", [
        'dessert.common',
        'dessert.view.init',
        "jquery"
    ], function(common, viewInit, $) {

        var selectors = common.selectors;
        var attrs = common.attrs;

        /**
         * Initializes all of the dessertJS controllers in the application context.
         * Each controller has views associated with it that will be initialized.
         * This initialization is synchronous. The initialization goes through each
         * controller instance and finds all of the views associated with that controller
         * and continues to initialize through the hierarchy.
         * 
         * @param {Object} $module The jQuery instance that encapsulates the dessertJS Module.
         * @param {Object} module The dessertJS module instance.
         * @param {Object} app The dessertJS application context instance.
         * @param {any[]} args The arguments array that will be treated as global parameters for the controller.
         * @param {Object} page The single page application context that the controller is being initialized in.
         * @param {Function} callback The function that is invoked after the initialization is completed.
         */
        return function($module, module, app, args, page, callback) {
            var controllers = $module.find(selectors.controller);
            var $controller;
            var controller;
            if (controllers.length > 0) {
                controllers.each(function() {
                    $controller = $(this);
                    if (!callback) {
                        controller = module.controllers.get($controller.attr(attrs.controller));
                        controller.$controller = $controller;
                    }
                    viewInit($controller, controller, module, $module, app, args, page, callback);
                });
            } else {
                //Handle partial view init
                viewInit($controller, controller, module, $module, app, args, page, callback)
            }
        };
    });
})();