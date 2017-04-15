(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var Controller;
    var PropertyHelper;
    var RouteManager;
    var ajax;
    var dom;
    var HttpHandler;
    var Rendering;

    define(['helpers/ajax-helper', 'helpers/property-helper', 'helpers/dom-helper', 'dessert.controller', 'dessert.routemanager', 'dessert.httphandler', 'dessert.rendering'], main);

    function main($Ajax, $PropertyHelper, $DomHelper, $Controller, $RouteManager, $HttpHandler, $Rendering) {
        ajax = $Ajax;
        Controller = $Controller;
        PropertyHelper = $PropertyHelper;
        RouteManager = $RouteManager;
        dom = $DomHelper;
        HttpHandler = $HttpHandler;
        Rendering = $Rendering;

        return Application;
    }

    var Application = function () {
        function Application(name) {
            _classCallCheck(this, Application);

            var CONTROLLERS = {};
            var ROUTE_MGR = new RouteManager();
            var HTTP_HANDLER = new HttpHandler();
            var COMPONENT_CACHE = {};

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'name',
                value: name
            }]);

            setControllerFunctions(this, CONTROLLERS);
            setRouteManagerFunctions(this, ROUTE_MGR);
            setComponentCacheFunctions(this, COMPONENT_CACHE);
            setRenderingFunctions(this, CONTROLLERS, ROUTE_MGR, COMPONENT_CACHE, HTTP_HANDLER);
            setHttpHandlerFunctions(this, HTTP_HANDLER);
        }

        _createClass(Application, [{
            key: 'selector',
            get: function get() {
                return '[data-dsrt-app=' + this.name + ']';
            }
        }, {
            key: 'element',
            get: function get() {
                return document.querySelector(this.selector);
            }
        }, {
            key: 'page',
            get: function get() {
                return this.element.querySelector(Application.pageSelector);
            }
        }], [{
            key: 'pageSelector',
            get: function get() {
                return '[data-dsrt-page]';
            }
        }]);

        return Application;
    }();

    function setControllerFunctions(instance, controllers) {
        instance.getController = function (name) {
            return controllers[name];
        };

        instance.controller = function controllerFactory(name, ctor) {
            var controller = controllers[name];

            if (!controller) {
                controller = new Controller(name, ctor);
                controllers[name] = controller;
            }

            return controller;
        };
    }

    function setRouteManagerFunctions(instance, routeMgr) {
        instance.mapRoute = function (path, controllerName, view) {
            return routeMgr.route(path, controllerName, view);
        };

        instance.clearRoute = function (path) {
            return routeMgr.clearRoute(path);
        };
    }

    function setComponentCacheFunctions(instance, componentCache) {
        instance.registerComponent = function (component) {
            return componentCache[component.name] = component;
        };

        instance.removeComponent = function (name) {
            return delete componentCache[name];
        };
    }

    function setRenderingFunctions(instance, controllers, routeMgr, components, httpHandler) {
        instance.render = function render() {
            var path = RouteManager.cleanHash;
            var route = routeMgr.getRoute(path);

            if (route && route.view && route.controller) {
                var page = instance.page;
                var controller = controllers[route.controller];
                ajax.get(route.view).then(function (html) {
                    dom.emptyElement(page);
                    var docFrag = dom.createDocFrag(html);
                    page.appendChild(docFrag);
                    var componentInstances = Rendering.renderComponents(page, components, controller);
                    controller.init(page);
                }).fail(function (xhr) {
                    var status = xhr.status;
                    httpHandler.fireHandlers(code, [status, xhr.statusText]);
                });
            } else {
                httpHandler.fireHandlers(404, ['Route not found for path ' + path]);
            }
        };
    }

    function setHttpHandlerFunctions(instance, httpHandler) {
        instance.addHttpHandler = function (code, handler) {
            return httpHandler.addHandler(code, handler);
        };
        instance.getHttpHandlers = function (code) {
            return httpHandler.getHandlers(code);
        };
    }
})();