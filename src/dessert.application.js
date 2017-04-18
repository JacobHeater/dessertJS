(() => {

    'use strict';

    var Controller;
    var PropertyHelper;
    var RouteManager;
    var ajax;
    var dom;
    var HttpHandler;
    var Rendering;
    var TypeHelper;
    var ResourceManager;

    define(
        [
            'helpers/ajax-helper',
            'helpers/property-helper',
            'helpers/dom-helper',
            'helpers/type-helper',
            'dessert.controller',
            'dessert.routemanager',
            'dessert.httphandler',
            'dessert.rendering',
            'dessert.resourcemanager'
        ],
        main
    );

    function main(
        $Ajax,
        $PropertyHelper,
        $DomHelper,
        $TypeHelper,
        $Controller,
        $RouteManager,
        $HttpHandler,
        $Rendering,
        $ResourceManager
    ) {
        ajax = $Ajax;
        Controller = $Controller;
        PropertyHelper = $PropertyHelper;
        RouteManager = $RouteManager;
        dom = $DomHelper;
        HttpHandler = $HttpHandler;
        Rendering = $Rendering;
        TypeHelper = $TypeHelper;
        ResourceManager = $ResourceManager;

        return Application;
    }

    class Application {
        constructor(name) {
            const CONTROLLERS = {};
            const ROUTE_MGR = new RouteManager();
            const HTTP_HANDLER = new HttpHandler();
            const COMPONENT_CACHE = {};
            const RESOURCE_CACHE = {};

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'name',
                value: name
            }]);

            setControllerMethods(this, CONTROLLERS);
            setRouteManagerMethods(this, ROUTE_MGR);
            setComponentCacheMethods(this, COMPONENT_CACHE);
            setRenderingMethods(this, CONTROLLERS, ROUTE_MGR, COMPONENT_CACHE, HTTP_HANDLER);
            setHttpHandlerMethods(this, HTTP_HANDLER);
            setResourceCacheMethods(this, RESOURCE_CACHE);
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

    function setControllerMethods(instance, controllers) {
        instance.getController = (name) => controllers[name];

        instance.controller = function controllerFactory(name, ctor) {
            var controller = controllers[name];

            if (!controller) {
                controller = new Controller(name, ctor);
                controllers[name] = controller;
            }

            return controller;
        }
    }

    function setRouteManagerMethods(instance, routeMgr) {
        instance.route = (map) => {
            if (TypeHelper.isObject(map)) {
                Object.keys(map).forEach(path => {
                    let viewMap = map[path];
                    Object.keys(viewMap).forEach(ctrlName => {
                        let view = viewMap[ctrlName];
                        instance.mapRoute(path, ctrlName, view);
                    });
                });
            }
        };

        instance.mapRoute = (path, controllerName, view) => routeMgr.route(path, controllerName, view);

        instance.clearRoute = path => routeMgr.clearRoute(path);
    }

    function setComponentCacheMethods(instance, componentCache) {
        instance.registerComponent = component => componentCache[component.name] = component;
        instance.registerComponents = components => {
            components.forEach(instance.registerComponent);
        };

        instance.removeComponent = name => delete componentCache[name];
    }

    function setRenderingMethods(instance, controllers, routeMgr, components, httpHandler) {
        instance.render = function render() {
            var path = RouteManager.cleanHash;
            var route = routeMgr.getRoute(path);

            if (route && route.view && route.controller) {
                let page = instance.page;
                let controller = controllers[route.controller];
                ResourceManager
                    .loadResources(instance.resources())
                    .then(() => {
                        ajax
                            .get(route.view)
                            .then(html => {
                                dom.emptyElement(page);
                                var docFrag = dom.createDocFrag(html);
                                page.appendChild(docFrag);
                                var componentInstances = Rendering.renderComponents(instance, page, components, controller);
                                controller.init(page);
                            })
                            .fail(xhr => {
                                var status = xhr.status;
                                httpHandler.fireHandlers(code, [status, xhr.statusText]);
                            });
                    });
            } else {
                httpHandler.fireHandlers(404, [`Route not found for path ${path}`]);
            }
        };
    }

    function setHttpHandlerMethods(instance, httpHandler) {
        instance.addHttpHandler = (code, handler) => httpHandler.addHandler(code, handler);
        instance.getHttpHandlers = code => httpHandler.getHandlers(code);
    }

    function setResourceCacheMethods(instance, resourceCache) {
        instance.resources = function resources(config) {
            if (config) {
                Object.assign(resourceCache, config);
            } else {
                return resourceCache;
            }
        };
    }

})();