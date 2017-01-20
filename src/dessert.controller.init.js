/**
 * @file Initializes the dessertJS controllers in the application context.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define([
            './dessert.common',
            './dessert.view.init'
        ],
        /**
         * The require module that is responsible for initializing dessertJS Controllers.
         * 
         * @param {Common} common The dessertJS common helper library.
         * @param {viewInit} viewInit The view init helper function.
         * 
         * @return {Function} The function that is responsible for initializing dessertJS Controllers.
         */
        function dessertControllerInitModule(common, viewInit) {

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
            return function dessertControllerInit($module, module, app, args, page, callback) {
                var $ = null;

                if (app.providers.jquery) {
                    $ = app.providers.jquery;
                }

                var controllers = $module.find(selectors.controller);
                var $controller;
                var controller;
                if (controllers.length > 0) {
                    controllers.each(function controllersForEach() {
                        $controller = $(this);
                        if (!callback) {
                            controller = module.controllers.get($controller.attr(attrs.controller));
                            if (controller) {
                                controller.$controller = $controller;
                                if ($.isFunction(controller.onInit)) {
                                    controller.onInit();
                                }
                                var initController = function () {
                                    if (controller.instance.isAsync) {
                                        controller.instance.ready(function () {
                                            //When the controller is done doing it's async stuff, it will notify us
                                            //and this will be executed.
                                            viewInit($controller, controller, module, $module, app, args, page, callback);

                                            common.utils.addReadOnlyProperty(controller, 'initialized', true);
                                        });
                                        controller.instance.init();
                                    } else {
                                        viewInit($controller, controller, module, $module, app, args, page, callback);

                                        common.utils.addReadOnlyProperty(controller, 'initialized', true);
                                    }
                                };
                                //Instantiate the controller using the controller's constructor function.
                                if (!(controller.instance || controller.instance instanceof controller.constructor)) {
                                    controller.instance = new controller.constructor();

                                    if (!$controller.isWithin(selectors.page)) {
                                        /*
                                        Because anything that loads outside of the dynamic page content
                                        will only be loaded once, but the entire application will be analyzed
                                        every time the route changes, we don't want the runtime to re-evaluate
                                        content that has already been loaded. Lots of async stuff has already
                                        happened, and once those controls have been resolved in their respective
                                        controllers, we can't re-resolve them. 

                                        This prevents those controllers and their child
                                        content from being re-analyzed.
                                        */
                                        common.utils.addReadOnlyProperty(controller, 'initOnce', true);
                                    }
                                }
                                if (controller.initOnce && !controller.initialized) {
                                    //We can initialize the controller safely because it hasn't been initialized.
                                    initController();
                                } else if (!controller.initOnce) {
                                    //We can always init the controller safely.
                                    initController();
                                }
                            }
                        }
                    });
                } else {
                    //Handle partial view init
                    viewInit($controller, controller, module, $module, app, args, page, callback)
                }
            };
        });
})();