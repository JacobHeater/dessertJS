
define(['./dessert.controller'], function(Controller) {
    "use strict";
    function Module(name, app, $module, globals) {
        var controllers = {};
        this.name = name || "";
        this.controller = function(name, implementation) {
            controllers[name] = new Controller(name, this, undefined, implementation);
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
        this.$module = $module;
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
        this.src = function(path) {
            return this.getPath(app.pathTypes.src, path);
        };
        this.template = function(path) {
            return this.getPath(app.pathTypes.templates, path);
        }
    };
    return Module;
});
