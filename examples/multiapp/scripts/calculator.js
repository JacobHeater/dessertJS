(function() {
    "use strict";

    define(["dessert.core"], function(dessert) {
        var app = dessert
            .app('calculator')
            .onInit(function() {
                this.src = "./views/";
                this.templates = "./templates/";
                this.dessertPath = "./scripts/dessert/";
            })
            .cache()
            .ready();

        var module = app.module("calculator");

        module.controller("calcCtrl", function(view, model, module, page) {
            console.log(view);
            var ctrlGroups = view.controlGroups;
            var buttons = ctrlGroups.button;
            var input = view.controls.input;

            buttons.forEach(function(btn) {
                btn.click(function() {
                    alert('');
                });
            });
        });

        app.init();
    });
})();