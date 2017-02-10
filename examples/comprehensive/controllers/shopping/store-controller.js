(function() {


    'use strict';

    define(main);

    function main() {
        return function initStoreController($module) {
            $module.controller('store-controller', function() {

                var view;
                var controls;

                this.scope = function($scope) {
                    view = $scope.view;
                    controls = view.controls;
                };

                this.init = function() {

                };

            });
        }
    }


})();
