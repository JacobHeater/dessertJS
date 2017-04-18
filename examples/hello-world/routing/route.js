(() => {


    'use strict';

    define(main);

    function main() {
        return mapRoutes;
    }

    function mapRoutes(app) {
        app.route({
            '/': {
                'hello-world-controller': 'views/hello-world.html'
            },
            '/john-doe': {
                'hello-world-controller': 'views/hello-john-doe.html'
            }
        });
    }


})();
