define([
        './dessert.app',
        './dessert.common',
        './dessert.init',
        './dessert.singlepage.init',
        './dessert.routing',
        "jquery"
    ],
    function(
        App,
        common,
        init,
        spa,
        routing,
        $
    ) {
        "use strict";
        var appCache = {};
        var selectors = common.selectors;
        var attrs = common.attrs;
        var regex = common.regex;
        //This is a private wrapper for our $.dsrt object
        var $dsrt = {
            init: function(done, args, isPage, isHash) {
                //TODO: figure out why when the hash changes that the old page url is getting requested again.
                var $dsrt = this;
                var apps = $(selectors.app);
                var $page = $(selectors.page);
                var $app;
                var app;
                var $context;
                apps.each(function(h) {
                    $app = $(this);
                    app = appCache[$app.attr(attrs.app)]; //Lookup the app in the cache
                    init($app, app, args, isPage, isHash, done);
                    if (!isPage && $page.length > 0) { //Don't init the page if it's the page init method.
                        spa(app, $page);
                    }
                });
                $(selectors.mask).removeAttr(attrs.mask);
                return this;
            },
            pageInit: function(args) {
                this.init(null, args, true, false);
                return this;
            },
            hashInit: function(args) {
                this.init(null, args, false, true);
                return this;
            }
        };
        var dsrtModule = {
            preinit: function(handler) {
                handler.call(this);
                return this;
            },
            init: function(dependencies, done) {
                require(dependencies, function() {
                    $dsrt.init(done);
                });
            },
            app: function(name) {
                var app = appCache[name] || new App(name, $dsrt);
                return {
                    onInit: function(handler) {
                        if (typeof handler === 'function') {
                            handler.call(app, app);
                        }
                        return this;
                    },
                    cache: function() {
                        appCache[app.name] = app;
                        return this;
                    },
                    ready: function() {
                        if (appCache[app.name] === app) {
                            routing.initBackButtonHandler(function() {
                                $dsrt.hashInit([]);
                            });
                            return appCache[app.name];
                        }
                        throw new Error("You did not add this application context to the dsrt appCache. You must call the \".cache()\" method before calling \".ready()\"");
                    }
                };
            }
        };
        return dsrtModule;
    }
);