/* eslint-disable */
//REVIEW: Disabling for now until auth example gets more attention.
(function() {

    'use strict';


    define([
        '../../services/auth-service'
    ], main);

    function main(authService) {
        return function initAuthenticationController($module) {
            $module.controller('authentication-controller', function() {

                var view;
                var controls;
                var page;

                this.scope = function($scope) {
                    view = $scope.view;
                    controls = view.controls;
                    page = $scope.page;
                };

                this.init = function() {
                    var btnLogin = controls.btnLogin;
                    var tbEmail = controls.email;
                    var tbPassword = controls.password;

                    controls.btnLogin.click(function() {
                        if (tbEmail.val().trim() && tbPassword.val().trim()) {
                            page.route('/authentication/home');
                        }
                    });
                };

            });
        };
    }

})();
