define(['./muv.common', './muv.routing'], function(common, routing) {
    "use strict";
    var selectors = common.selectors;
    var attrs = common.attrs;

    var Page = function(app, $page, args) {
        this.app = app;
        this.route = function(src, args) {
            routing.setRoute(src, args);
        };
        this.$page = $page;
        this.args = args || [];
    };

    return Page;
});
