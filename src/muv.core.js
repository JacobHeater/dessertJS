
define([
        './muv.app',
        './muv.common',
        './muv.init'
    ],
    function(App, common, init) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        var regex = common.regex;
        //This is a private wrapper for our $.muv object
        var $muv = {
            init: function(args) {
                var $muv = this;
                var apps = $(selectors.app);
                apps.each(function(h) {
                    $app = $(this);
                    app = appCache[$app.attr(attrs.app)]; //Lookup the app in the cache
                    init($app, app, args);
                });
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
                require(dependencies, function(){
                  $muv.init();
                });
            },
            app: function(name) {
                var app = new App(name, $muv);
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
