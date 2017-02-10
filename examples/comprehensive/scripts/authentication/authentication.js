(function() {

    'use strict';

    define([
       '../../controllers/authentication/authentication-controller' 
    ], main);

    function main(authControllerInit) {

        return function initAuthenticationApp(app) {
            var $module = app.module('authentication');

            authControllerInit($module);
        }

    }

})();
