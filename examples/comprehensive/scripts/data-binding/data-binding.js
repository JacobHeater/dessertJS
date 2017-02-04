(function() {
    
    'use strict';

    define(main);

    function main() {
        return function initDataBindingApp(app) {
            app.module('data-binding').controller('data-binding-controller', function() {
                var view;
                var model;
                var controls;


                this.scope = function($scope) {
                    view = $scope.view;
                    controls = view.controls;
                    model = $scope.model;
                };


                this.init = function() {
                    model.textbox = "Initial string value!";
                    model.ddwn = [
                        'Test',
                        'Test2'
                    ];
                    model.rbl = 'Value 1';

                    var tb = controls.textbox;
                    var output = controls.output;
                    var rbl = controls.rbl;
                    var rblOutput = controls.rblOutput;
                    var ddwn = controls.ddwn;
                    var ddwnOutput = controls.ddwnOutput;

                    tb.dsrt.watch(function() {
                        output.text(model.textbox);
                    }).bind(model);

                    rbl.dsrt.watch(function() {
                        rblOutput.text(model.rbl);
                    }).bind(model);

                    ddwn.dsrt.watch(function() {
                        ddwnOutput.text(model.ddwn.join(' '));
                    }).bind(model);
                };

                this.destroy = function() { };

            });
        };
    }

})();
