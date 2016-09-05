define("dessert.page", ['dessert.routing'], function(routing) {
    
    "use strict";

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
