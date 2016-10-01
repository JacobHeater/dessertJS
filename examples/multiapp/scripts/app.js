(function () {
    "use strict";

    require.config({
        paths: {
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min",
            cesium: "../../external/cesium/cesium"
        }
    });

    require([
        "dessert.core",
        "dessert.routing"
    ], function (dessert, routing) {
        var app = dessert
            .app('multiapp', function () {
                this.src = "./views/";
                this.templates = "./templates/";
                this.dessertPath = "./scripts/dessert/";
            });

        app
            .module("main")
            .controller("mainCtrl", function () {
                var view;
                this.scope = function (scope) {
                    view = scope.view;
                };

                this.init = function () {
                    var appButtons = view.controlGroups.appButton;

                    appButtons.forEach(function (b) {
                        b.click(function () {
                            var target = $(this).attr("app");

                            switch (target) {
                                case "calculator":
                                    routing.setRoute("/apps/calculator");
                                    break;
                                case "shoppingCart":
                                    routing.setRoute("/apps/shoppingCart");
                                    break;
                            }
                        });
                    });
                };
            });

        app.init();
    });

})();