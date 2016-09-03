define(['./dessert.common', './dessert.routing'], function(common, routing) {
    "use strict";
    var selectors = common.selectors;
    var attrs = common.attrs;

    function Page(app, $page, args) {
        this.app = app;
        this.route = function(src, args) {
            routing.setRoute(src, args);
        };
        this.$page = $page;
        this.args = args || [];
    };

    return Page;
});
