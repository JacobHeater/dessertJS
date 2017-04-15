(() => {

    'use strict';

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

    class Application {
        constructor(name) {
            const CONTROLLERS = {};
            const ROUTE_MGR = new RouteManager();
            const HTTP_HANDLER = new HttpHandler();
            const COMPONENT_CACHE = {};

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

        static get pageSelector() {
            return `[data-dsrt-page]`;
        }

        get selector() {
            return `[data-dsrt-app=${this.name}]`;
        }

        get element() {
            return document.querySelector(this.selector);
        }

        get page() {
            return this.element.querySelector(Application.pageSelector);
        }
    }

    function setControllerFunctions(instance, controllers) {
        instance.getController = name => controllers[name];

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
        instance.mapRoute = (path, controllerName, view) => routeMgr.route(path, controllerName, view);

        instance.clearRoute = path => routeMgr.clearRoute(path);
    }

    function setComponentCacheFunctions(instance, componentCache) {
        instance.registerComponent = component => componentCache[component.name] = component;

        instance.removeComponent = name => delete componentCache[name];
    }

    function setRenderingFunctions(instance, controllers, routeMgr, components, httpHandler) {
        instance.render = function render() {
            var path = RouteManager.cleanHash;
            var route = routeMgr.getRoute(path);

            if (route && route.view && route.controller) {
                let page = instance.page;
                let controller = controllers[route.controller];
                ajax.get(route.view).then(html => {
                    dom.emptyElement(page);
                    var docFrag = dom.createDocFrag(html);
                    page.appendChild(docFrag);
                    var componentInstances = Rendering.renderComponents(page, components, controller);
                    controller.init(page);
                }).fail(xhr => {
                    var status = xhr.status;
                    httpHandler.fireHandlers(code, [status, xhr.statusText]);
                });
            } else {
                httpHandler.fireHandlers(404, [`Route not found for path ${path}`]);
            }
        };
    }

    function setHttpHandlerFunctions(instance, httpHandler) {
        instance.addHttpHandler = (code, handler) => httpHandler.addHandler(code, handler);
        instance.getHttpHandlers = code => httpHandler.getHandlers(code);
    }
})();