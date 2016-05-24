
define(['./muv.controller'], function(Controller) {
    var Module = function(name, app, globals) {
        var controllers = {};
        this.name = name || "";
        this.controller = function(name, implementation) {
            controllers[name] = new Controller(name, implementation);
            return controllers[name];
        };
        this.controllers = {
            get: function(name) {
                return controllers[name];
            },
            remove: function(name) {
                delete controller[name];
                return this;
            }
        };
        this.globals = globals || {};
        this.app = app;
        this.getPath = function(pathType, path) {
            if (pathType === app.pathTypes.src) {
                return {
                    path: app.src + path + '.html'
                };
            } else if (pathType === app.pathTypes.templates) {
                return {
                    path: app.templates + path + '.html'
                };
            }
        };
    };
    return Module;
});
