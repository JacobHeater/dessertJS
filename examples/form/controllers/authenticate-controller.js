(() => {

    'use strict';

    define(main);

    function main() {
        return setupAuthController;
    }

    function setupAuthController(app) {
        app.controller('authenticate-controller', function(page) {
            var components = this.components;
            var repeater = components.repeater;
            var auth = components.auth;

            

            repeater.when('template element is created', elem => console.log(elem.firstChild));
            
            repeater.repeat('<div style="font-weight: bold;">{{n}}</div>', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => {
                return {
                    n: num
                };
            }));
            
            auth.when('User has authenticated', function(userName) {
                page.routeTo('/account', [userName]);
            });
        });
    }

})();
