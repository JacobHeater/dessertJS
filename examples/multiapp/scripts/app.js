(function() {
    "use strict";

    define([
        "dessert.core",
        "dessert.routing"
    ], function(dessert, routing) {
        var app = dessert
            .app('multiapp')
            .onInit(function() {
                this.src = "./views/";
                this.templates = "./templates/";
                this.dessertPath = "./scripts/dessert/";
            })
            .cache()
            .ready();

        app
            .module("main")
            .controller("mainCtrl", function(view, model, module, page) {
                var controls = view.controls;
                var btnCalculator = controls.btnCalc;

                btnCalculator.click(function() {
                    routing.setRoute("/apps/calculator")
                });
            });

        app.init();
    });

})();