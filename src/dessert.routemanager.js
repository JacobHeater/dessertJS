(() => {

    'use strict';

    var ArrayHelper;
    var Route;

    define(
        [
            './helpers/array-helper',
            'dessert.route'
        ],
        main
    );

    function main(
        $ArrayHelper,
        $Route
    ) {
        ArrayHelper = $ArrayHelper;
        Route = $Route;

        return RouteManager;
    }

    class RouteManager {
        constructor() {
            const ROUTES = {};

            setRouteFunctions(this, ROUTES);
        }

        static get hash() {
            return window.location.hash;
        }

        static get cleanHash() {
            return this.hash.replace('#', '').replace(/\:.*/g, '');
        }

        static routeTo(path, args = ['']) {
            if (!Array.isArray(args)) {
                args = [''];
            }

            if (!/\/$/.test(path)) {
                path += '/';
            }

            path += args.reduce((c, n) => `${c}/${n}`);

            window.location.hash = path;
        }
    }

    function setRouteFunctions(instance, routes) {
        instance.getRoute = path => {
            var routeValues = ArrayHelper.objectValues(routes);
            var route = routes[path];

            if (!route) {
                var hasArgs = routeValues.filter(r => r.args.length > 0);
                var matchTemplate = hasArgs.find(a => a.matchTemplate(path));
                route = matchTemplate;
            }
            return route;
        };

        instance.route = function routeFactory(path, controllerName, view) {
            var route = routes[path];
            var pathArgs;
            if (!route) {
                pathArgs = Route.parsePathArgs(path);
                route = new Route(path, controllerName, view, pathArgs);
                routes[path] = route;
            }

            return route;
        };

        instance.clearRoute = path => delete routes[path];
    }

})();