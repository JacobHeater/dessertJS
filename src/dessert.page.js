/**
 * @file A require.js module for defining a dessertJS Page prototype.
 * @author Jacob Heater
 * @since
 */
(function () {
    "use strict";

    define([
            './dessert.routing'
        ],
        /**
         * The module that exposes the dessert Page prototype.
         * 
         * @param {Routing} routing The dessert routing module that routes for the page.
         * @returns {Page} The Page prototype.
         */
        function dessertPageModule(routing) {

            /**
             * Defines a dessertJS page prototype for singe page application modes.
             * 
             * @param {Object} app The application the page lives in.
             * @param {Objet} $page The jQuery instance that represents dsrt-page.
             * @param {Object} args The arguments that the page is initialized with.
             */
            function Page(app, $page, args) {
                this.app = app;
                this.$page = $page;
                this.args = args || [];
            };

            /**
             * Sets the route for the page by using the dessert routing module.
             * 
             * @param {String} path The route path to navigate to.
             * @param {KeyValuePair[]} args The array that contains the list of key value pairs to set the query string args to.
             */
            Page.prototype.route = function route(path, args) {
                routing.setRoute(path, args);
            };

            return Page;
        });

})();