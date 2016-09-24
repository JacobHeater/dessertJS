/**
 * @file A require.js module for defining a dessertJS Page prototype.
 * @author Jacob Heater
 * @since
 */
(function() {
    "use strict";

    define("dessert.page", ['dessert.routing'], function dessertPageModule(routing) {

        /**
         * Defines a dessertJS page prototype for singe page application modes.
         * 
         * @param {Object} app The application the page lives in.
         * @param {Objet} $page The jQuery instance that represents dsrt-page.
         * @param {Object} args The arguments that the page is initialized with.
         */
        function Page(app, $page, args) {
            this.app = app;
            this.route = function route(src, args) {
                routing.setRoute(src, args);
            };
            this.$page = $page;
            this.args = args || [];
        };

        return Page;
    });

})();