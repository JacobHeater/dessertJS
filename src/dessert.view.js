
define(function() {
    "use strict";
    //A View is a collection of Controls
    var View = function(name, controller, $view) {
        this.name = name || "";
        this.controller = controller;
        this.$view = $view;
        this.destroy = function() {
          this.$view.remove();
        };
        this.controls = {
            add: function(control) {
                if (control && control.dsrt) {
                    this[control.dsrt.name] = control;
                }
                return this;
            },
            get: function(name) {
                return this[name];
            },
            remove: function(name) {
                delete this[name];
                return this;
            }
        };
    };
    return View;
});
