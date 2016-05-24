define(['./muv.module', './muv.common'], function (Module, Common) {
    var App = function (name) {
        this.name = name || "";
        var modules = {};
        this.module = function (name, app, globals) {
            modules[name] = new Module(name, app, globals);
            return modules[name];
        };
        this.modules = {
            get: function (name) {
                return modules[name];
            },
            remove: function (name) {
                delete modules[name];
                return this;
            }
        };
        this.src = "";
        this.templates = "";
        this.pathTypes =  Common.pathTypes;
    };
    return App;
});
