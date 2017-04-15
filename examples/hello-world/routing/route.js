(() => {


    'use strict';

    define(main);

    function main() {
        return mapRoutes;
    }

    function mapRoutes(app) {
        app.mapRoute('/', 'hello-world-controller', 'views/hello-world.html');
        app.mapRoute('/john-doe', 'hello-world-controller', 'views/hello-john-doe.html');
    }


})();
