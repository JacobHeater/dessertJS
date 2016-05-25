define(['./muv.common'], function(common) {
    var selectors = common.selectors;
    var attrs = common.attrs;

    var Page = function(app, args) {
        this.app = app;
        this.src = function(src, args) {
            $(selectors.page).attr(attrs.src, this.app.src + src);
            this.app.init(args);
        };
        this.args = args || {};
    };

    return Page;
});
