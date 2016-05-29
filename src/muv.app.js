define(['./muv.module', './muv.common'], function (Module, Common) {
    var App = function (name, muv, $app) {
        this.name = name || "";
        var modules = {};
        this.module = function (name, globals) {
            modules[name] = new Module(name, this, globals);
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
        this.init = function(args) {
          muv.init(args);
        };
        this.$app = $app;
        this.src = "";
        this.templates = "";
        this.muvPath = "";
        this.pathTypes =  Common.pathTypes;
    };
    return App;
});
