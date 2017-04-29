(() => {

    'use strict';

    define(main);

    function main() {
        return setupAuthController;
    }

    function setupAuthController(app) {
        app.controller('authenticate-controller', function(page) {
            var components = this.components;
            
            components.auth.when('User has authenticated', function(userName) {
                page.routeTo('/account', [userName]);
            });
        });
    }

})();
