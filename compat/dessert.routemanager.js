(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Route;

    define(['dessert.route'], main);

    function main($Route) {
        Route = $Route;

        return RouteManager;
    }

    var RouteManager = function () {
        function RouteManager() {
            _classCallCheck(this, RouteManager);

            var ROUTES = {};

            setRouteFunctions(this, ROUTES);
        }

        _createClass(RouteManager, null, [{
            key: 'hash',
            get: function get() {
                return window.location.hash;
            }
        }, {
            key: 'cleanHash',
            get: function get() {
                return this.hash.replace('#', '');
            }
        }]);

        return RouteManager;
    }();

    function setRouteFunctions(instance, routes) {
        instance.getRoute = function (path) {
            return routes[path];
        };

        instance.route = function routeFactory(path, controllerName, view) {
            var route = routes[path];

            if (!route) {
                route = new Route(path, controllerName, view);
                routes[path] = route;
            }

            return route;
        };

        instance.clearRoute = function (path) {
            return delete routes[path];
        };
    }
})();