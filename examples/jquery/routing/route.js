(() => {


    'use strict';

    define(main);

    function main() {
        return mapRoutes;
    }

    function mapRoutes(app) {
        app.route({
            '/': {
                'jquery-example-controller': 'views/jquery-example.html'
            }
        });
    }


})();
