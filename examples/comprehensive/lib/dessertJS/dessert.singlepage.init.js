/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function () {

    "use strict";

    define([
            './dessert.routing',
            './dessert.common'
        ],
        /**
         * The module that is responsible for intializing the single page application scope.
         * 
         * @param {Routing} routing The dessert routing module that is responsible for routing in the application.
         * @param {Commong} common The dessert common helper library.
         * @returns {Function} The function that is repsonsible for initializing the single page application.
         */
        function singlePageInitModule(routing, common) {

            var attrs = common.attrs;

            /**
             * Initializes the single page application scope using the given application configuration
             * and the DOM element that represents that single page scope.
             * 
             * @param {Application} app The dessert application instance that configures the application.
             * @param {Element} $page The DOM element that contains the single page scope.
             */
            return function dessertSinglePageInit(app, $page) {
                var path = routing.getRoute();
                var args = routing.getParams();
                if (path && args) {
                    $page.attr(attrs.src, path);
                    app.pageInit(args);
                } else if ($page.attr(attrs.page)) {
                    var path = $page.attr(attrs.page);
                    if (!routing.hasRoute(path)) {
                        path = "#".concat(path);
                    }
                    path = routing.getRoute(path);
                    var args = routing.getParams(path);
                    $page.attr(attrs.src, path);
                    app.pageInit(args);
                }
            };
        });

})();