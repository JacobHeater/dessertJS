(function() {
    "use strict";

    require(["dessert.core"], function(dessert) {
        var app = dessert
            .app('calculator')
            .onInit(function() {
                this.src = "./views/";
                this.templates = "./templates/";
                this.dessertPath = "./scripts/dessert/";
            })
            .cache()
            .ready();

        app
            .module("calculator")
            .controller("calcCtrl", function(view) {
                var ctrlGroups = view.controlGroups;
                var buttons = ctrlGroups.button;
                var input = view.controls.input;
                var equals = view.controls.equals;
                var clear = view.controls.clear;

                buttons.forEach(function(btn) {
                    btn.click(function() {
                        input.val(input.val() + $(this).text().trim());
                    });
                });

                var calcSwitch = {
                    "*": function(n1, n2) {
                        input.val(n1 * n2);
                    },
                    "/": function(n1, n2) {
                        input.val(n1 / n2);
                    },
                    "-": function(n1, n2) {
                        input.val(n1 - n2);
                    },
                    "+": function(n1, n2) {
                        input.val(n1 + n2);
                    },
                    def: function() {

                    }
                };

                equals.click(function() {
                    var numbers = input.val().split(/[\+\-\/\*]+/g).map(function(n) {
                        return parseInt(n);
                    });
                    var operator = input.val().split(/[\d.]+/g).filter(function(o) {
                        return o.trim() !== "";
                    })[0];

                    var handle = calcSwitch[operator] || calcSwitch.def;

                    handle(numbers[0], numbers[1]);
                });

                clear.click(function() {
                    input.val("");
                });
            });

        app.init();
    });
})();