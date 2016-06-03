
define([
        './muv.app',
        './muv.common',
        './muv.init',
        './muv.singlepage.init',
        './muv.routing'
    ],
    function(App, common, init, spa, routing) {
        "use strict";
        var selectors = common.selectors;
        var attrs = common.attrs;
        var regex = common.regex;
        //This is a private wrapper for our $.muv object
        var $muv = {
            init: function(args, isPage) {
                var $muv = this;
                var apps = $(selectors.app);
                var $app;
                var app;
                apps.each(function(h) {
                    $app = $(this);
                    app = appCache[$app.attr(attrs.app)]; //Lookup the app in the cache
                    init($app, app, args);
                    if (!isPage) {
                        var page = $(selectors.page);
                        if (page.length > 0) {
                            spa(app, page);
                        }
                    }
                });
                $(selectors.mask).removeAttr(attrs.mask);
                return this;
            },
            pageInit: function(args) {
                this.init(args, true);
                return this;
            }
        };
        //Extend the $ object with the muv namespace
        var appCache = {};
        var _module = {
            preinit: function(handler) {
                handler.call(this);
                return this;
            },
            init: function(dependencies) {
                require(dependencies, function() {
                    $muv.init();
                });
            },
            app: function(name) {
                var app = appCache[name] || new App(name, $muv);
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
                                $muv.init();
                            });
                            return appCache[app.name];
                        }
                        throw new Error("You did not add this application context to the muv appCache. You must call the \".cache()\" method before calling \".ready()\"");
                    }
                };
            }
        };
        return _module;
    }
);
