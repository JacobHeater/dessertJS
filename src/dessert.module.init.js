/**
 * @file A require.js module responsible for initializing dessertJS Modules.
 * @author Jacob Heater
 */
(function() {

    "use strict";

    define("dessert.module.init", [
        'dessert.controller.init',
        'dessert.common',
        'dessert.page',
        'dessert.routing',
        "jquery"
    ], function(
        controllerInit,
        common,
        Page,
        routing,
        $
    ) {

        var selectors = common.selectors;
        var attrs = common.attrs;

        /**
         * Initializes the dessertJS application context Modules.
         * 
         * @param {Object} $context The jQuery instance to lookup dsrt-module scopes in.
         * @param {Object} app The dessert application context the initialization is running in.
         * @param {any[]} args The argument array to be passed into the controller constructor.
         * @param {Function} callback The callback to invoke when initialization is completed.
         */
        return function($context, app, args, callback) {
            var page;
            var modules;
            var $page;
            var $module;
            var module;
            var views;
            var $view;
            modules = $context.find(selectors.module);
            if (modules.length === 0) {
                //Handle partial views
                views = $context.find(selectors.view);
                views.each(function() {
                    $view = $(this);
                    $view.wrap('<div />').parent().attr(attrs.module, $view.attr(attrs.view).concat('$partial'));
                });
                modules = $context.find(selectors.module);
            }
            $page = $context.find(selectors.page).eq(0);
            if ($page && $page.length > 0) {
                page = new Page(app, $page, args);
                if (!routing.hasRoute()) {
                    routing.setRoute($page.attr(attrs.page), args);
                }
            }
            modules.each(function() {
                $module = $(this);
                module = app.modules.get($module.attr(attrs.module));
                if (module) {
                    module.$module = $module;
                    if ($.isFunction(module.onInit)) {
                        module.onInit();
                    }
                    controllerInit($module, module, app, args, page, callback);
                }
            });
            if (typeof callback === "function") {
                callback(app, $context, args);
            }
        };
    });

})();