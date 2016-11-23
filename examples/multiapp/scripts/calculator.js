(function () {
    "use strict";

    require.config({
        paths: {
            jquery: "https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.0/jquery.min"
        }
    });

    require(["../../../bin/dessertJS/dessert.core", "jquery"], function (dessert, jquery) {
        var app = dessert
            .app('calculator', function () {
                this.src = "./views/";
                this.templates = "./templates/";
                this.providers.jquery = jquery;
            });

        app
            .module("calculator")
            .controller("calcCtrl", function () {
                var view;
                this.scope = function (scope) {
                    view = scope.view;
                };

                this.init = function () {
                    var ctrlGroups = view.controlGroups;
                    var buttons = ctrlGroups.button;
                    var input = view.controls.input;
                    var equals = view.controls.equals;
                    var clear = view.controls.clear;

                    buttons.forEach(function (btn) {
                        btn.click(function () {
                            input.val(input.val() + $(this).text().trim());
                        });
                    });

                    var calcSwitch = {
                        "*": function (n1, n2) {
                            input.val(n1 * n2);
                        },
                        "/": function (n1, n2) {
                            input.val(n1 / n2);
                        },
                        "-": function (n1, n2) {
                            input.val(n1 - n2);
                        },
                        "+": function (n1, n2) {
                            input.val(n1 + n2);
                        },
                        def: function () {

                        }
                    };

                    equals.click(function () {
                        var numbers = input.val().split(/[\+\-\/\*]+/g).map(function (n) {
                            return parseInt(n);
                        });
                        var operator = input.val().split(/[\d.]+/g).filter(function (o) {
                            return o.trim() !== "";
                        })[0];

                        var handle = calcSwitch[operator] || calcSwitch.def;

                        handle(numbers[0], numbers[1]);
                    });

                    clear.click(function () {
                        input.val("");
                    });
                };
            });

        app.init();
    });
})();