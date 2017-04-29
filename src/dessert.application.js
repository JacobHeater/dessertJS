(() => {

    'use strict';

    var Page;
    var Controller;
    var PropertyHelper;
    var RouteManager;
    var ArrayHelper;
    var ajax;
    var dom;
    var HttpHandler;
    var Rendering;
    var TypeHelper;
    var ResourceManager;
    var DessertElement;
    var ResourceRequest;
    var Status;

    define(
        [
            'helpers/ajax-helper',
            'helpers/array-helper',
            'helpers/property-helper',
            'helpers/dom-helper',
            'helpers/type-helper',
            'dessert.page',
            'dessert.controller',
            'dessert.routemanager',
            'dessert.httphandler',
            'dessert.rendering',
            'dessert.resourcemanager',
            'dessert.element',
            'dessert.resourcerequest',
            'dessert.status'
        ],
        main
    );

    function main(
        $Ajax,
        $ArrayHelper,
        $PropertyHelper,
        $DomHelper,
        $TypeHelper,
        $Page,
        $Controller,
        $RouteManager,
        $HttpHandler,
        $Rendering,
        $ResourceManager,
        $DessertElement,
        $ResourceRequest,
        $Status
    ) {
        Page = $Page;
        ajax = $Ajax;
        ArrayHelper = $ArrayHelper;
        Controller = $Controller;
        PropertyHelper = $PropertyHelper;
        RouteManager = $RouteManager;
        dom = $DomHelper;
        HttpHandler = $HttpHandler;
        Rendering = $Rendering;
        TypeHelper = $TypeHelper;
        ResourceManager = $ResourceManager;
        DessertElement = $DessertElement;
        ResourceRequest = $ResourceRequest;
        Status = $Status;

        return Application;
    }

    class Application {
        constructor(name, config) {
            const CONTROLLERS = {};
            const ROUTE_MGR = new RouteManager();
            const HTTP_HANDLER = new HttpHandler();
            const COMPONENT_CACHE = {};
            const RESOURCE_CACHE = {};

            let _dessertElement = DessertElement;

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'name',
                value: name
            }]);

            Object.defineProperties(this, {
                DessertElement: {
                    get: function getDessertElement() {
                        return _dessertElement;
                    },
                    set: function(element) {
                        if (Object.getPrototypeOf(element) === DessertElement && element.factory && element.prototype.replaceWith) {
                            _dessertElement = element;
                        }
                    }
                }
            });

            if (TypeHelper.isObject(config)) {
                Object
                    .keys(config)
                    .filter(filterApplicableKeys)
                    .forEach(key => this[key] = config[key]);                    
            }

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
            return this.DessertElement.find(this.selector);
        }

        get page() {
            return this.element.find(Application.pageSelector);
        }
    }

    function setControllerMethods(instance, controllers) {
        instance.getController = (name) => controllers[name];

        instance.controller = function controllerFactory(name, ctor) {
            var controller = controllers[name];

            if (!controller) {
                controller = new Controller(instance, name, ctor);
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
        var DessertElement = instance.DessertElement;

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
                                page.empty();
                                var docFrag = DessertElement.factory(html);
                                page.append(docFrag.element);
                                Rendering.renderComponents(instance, page, components, controller);
                                Rendering.renderControls(instance, page, controller);
                                controller.init(new Page(page, route.argsHash(path)));
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

        instance.requestResource = function requestResource(resourceRequest) {
            if (resourceRequest instanceof ResourceRequest) {
                let resourceName = resourceRequest.name;
                let match = instance.resources()[resourceName];

                if (match) {
                    return match.content;
                } else {
                    return Status.NOT_FOUND;
                }
            }
        };
    }

    function filterApplicableKeys(key) {
        let applicable = [
            'DessertElement'
        ];

        return ArrayHelper.isInArray(key, applicable);
    }

})();