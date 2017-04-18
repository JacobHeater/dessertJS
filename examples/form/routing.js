(() => {


    'use strict';

    define(main);

    function main() {
        return setupRoutes;
    }

    function setupRoutes(app) {
        app.route({
            '/': {
                'form-controller': 'views/home.html'
            }
        });
    }

})();
