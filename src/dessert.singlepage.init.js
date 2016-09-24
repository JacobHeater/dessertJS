/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function() {

    "use strict";

    define("dessert.singlepage.init", ['dessert.routing', 'dessert.common'], function singlePageInitModule(routing, common) {

        var attrs = common.attrs;

        return function dessertSinglePageInit(app, $page) {
            var path = routing.getRoute();
            var args = routing.getParams();
            if (path && args) {
                $page.attr(attrs.src, path);
                app.pageInit(args);
            }
        };
    });

})();