define(['./muv.common'], function(common) {
    var selectors = common.selectors;
    var attrs = common.attrs;

    var Page = function(app, $page, args) {
        this.app = app;
        this.src = function(src, args) {
            $(selectors.page).attr(attrs.src, this.app.src + src);
            this.app.init(args);
        };
        this.$page = $page;
        this.args = args || {};
    };

    return Page;
});
