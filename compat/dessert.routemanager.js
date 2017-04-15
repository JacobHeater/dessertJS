(() => {

    'use strict';

    var Route;

    define(['dessert.route'], main);

    function main($Route) {
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
            return this.hash.replace('#', '');
        }
    }

    function setRouteFunctions(instance, routes) {
        instance.getRoute = path => routes[path];

        instance.route = function routeFactory(path, controllerName, view) {
            var route = routes[path];

            if (!route) {
                route = new Route(path, controllerName, view);
                routes[path] = route;
            }

            return route;
        };

        instance.clearRoute = path => delete routes[path];
    }
})();