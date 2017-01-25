/**
 * @file A require.js module responsible for initializing dessertJS Modules.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define([
            './dessert.controller.init',
            './dessert.common',
            './dessert.page',
            './dessert.routing'
        ],
        /**
         * The requirejs entry point for the dessertJS Module initialization
         * module.
         * 
         * @param {ControllerInit} controllerInit The function that initializes the controllers of each module.
         * @param {Common} common The dessertJS common shared library.
         * @param {Page} Page The dessertJS Page prototype.
         * @param {Routing} routing The dessertJS routing library.
         * 
         * @returns {Function} The function that is responsible for initializing all dessertJS modules.
         */
        function dessertModuleInitModule(
            controllerInit,
            common,
            Page,
            routing
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
            return function dessertModuleInit($context, app, args, callback) {

                var $ = null;

                if (app.providers.jquery) {
                    $ = app.providers.jquery;
                }

                var page;
                var modules;
                var $page;
                var $module;
                var module;
                var views;
                var $view;

                modules = $context.find(selectors.module);


                $page = $context.find(selectors.page).eq(0);

                if ($page && $page.length > 0) {
                    page = new Page(app, $page, args);
                    if (!routing.hasRoute()) {
                        routing.setRoute($page.attr(attrs.page), args);
                    }
                }

                if (modules.length === 0) {
                    //Handle partial views
                    views = $context.find(selectors.view);
                    views.each(function viewsEach() {
                        $view = $(this);
                        $view.wrap('<div />').parent().attr(attrs.module, $view.attr(attrs.view).concat('$partial'));
                    });

                    //Because view rendering is synchronous, we can remove the mask attribute at this point
                    //because we know that the rendering is complete at this point.
                    $(selectors.mask).removeAttr(attrs.mask);

                    /*
                    A hook has been provided in the Application prototype to listen for when
                    the dessert mask has been lifted. Call that here if it's defined.
                    */
                    if (common.utils.isFunction(app.maskLifted)) {
                        app.maskLifted();
                    }
                } else {
                    modules.each(function modulesEach() {
                        $module = $(this);
                        module = app.modules.get($module.attr(attrs.module));
                        if (module) {
                            module.$module = $module;
                            if ($.isFunction(module.onInit)) {
                                module.onInit.call(module, module);
                            }
                            controllerInit($module, module, app, args, page, callback);
                        }
                    });
                }

                if (typeof callback === "function") {
                    callback(app, $context, args);
                }
            };
        });

})();