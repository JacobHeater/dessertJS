define(function () {
    //A View is a collection of Controls
    var View = function (name, controller) {
        this.name = name || "";
        this.controller = controller;
        this.controls = {
            add: function (control) {
                if (control && control.muv) {
                    this[control.muv.name] = control;
                }
                return this;
            },
            get: function (name) {
                return this[name];
            },
            remove: function (name) {
                delete this[name];
                return this;
            }
        };
    };
    return View;
});