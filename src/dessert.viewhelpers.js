(function () {
    "use strict";

    var $common,
        $asyncResource,
        attrs;

    define("dessert.viewhelpers", [
        "dessert.common",
        "dessert.asyncresource"
    ], main);

    /**
     * Require entry point.
     * 
     * @param {Object} $common The common helper libary for dessertjs.
     * @param {Function} $asyncResource A constructor function for async resources in dessertjs.
     * @returns {Object} The object that exposes helper methods.
     */
    function main(
        common,
        asyncResource
    ) {

        $common = common;
        $asyncResource = asyncResource;
        attrs = common.attrs;

        return {
            renderComponent: renderComponent,
            renderControl: renderControl
        };
    }

    function renderControl(
        app,
        view,
        elem,
        controlName,
        target
    ) {
        app.trackedElements.add(elem);
        //If there's a target we need to first append the elem to that target.
        if (target) {
            target.append(elem);
        }
        //Add the new instance of the control to the view's controls dictionary.
        view.controls.add({
            name: controlName,
            elem: elem,
            view: view,
            app: app
        });
    }

    function renderComponent(
        app,
        view,
        target,
        componentName,
        componentId,
        isInjection
    ) {
        var componentId;
        var componentEntry;
        //Track the component for destruction later.
        app.trackedElements.add(target);
        //Find the component by name in the app configuration.
        componentEntry = app.components.get(componentName);
        //Because components require a unique name, we're going to expect that the 
        //component has an ID to identify it by.
        componentId = componentId || target.prop(attrs.id);
        /*
        Set the view's component member as a new instance of asyncResouce.
        asyncResource exposes some functionality to allow us to notify the 
        controller of when the component is interactive.
        */
        view.components[componentId] = new $asyncResource();
        if (componentEntry) {
            /*
            If the component entry is valid, then we're going to do a require call to
            get the component definition. The component definition should expose the necessary
            functions that we need to render and instantiate the component definition.
            */
            if ($common.utils.isString(componentEntry)) {
                var componentCacheEntry = app.cache.componentCache.getEntry(componentEntry);
                if (!componentCacheEntry) {
                    //This component hasn't been cached yet. Require it and then cache it.
                    //Save some network bandwidth and cache it.
                    require([componentEntry], function (_component) {
                        if (_component) {
                            //Let's instantiate the component using its constructor function.
                            var c = new _component();
                            app.cache.componentCache.addEntry(componentEntry, c);
                            initializeComponent(view, c, componentId, target, app, isInjection);
                        }
                    });
                } else {
                    //We need the component initialization to perform as if it was a require call, which
                    //by nature is asynchronous. Therefore, we'll add this function the the event queue,
                    //and get it off the main thread.
                    $common.utils.defer(function () {
                        initializeComponent(view, componentCacheEntry, componentId, target, app, isInjection);
                    });
                }

            } else if ($common.utils.isFunction(componentEntry)) {
                /*
                This scenario allows for users to pass functions in as the 
                component definition, instead of relying on require to go out
                and get the component definition, we can directly get the constructor
                function for the component and instantiate it. This use case behaves
                exactly the same as the scenario above, but allows for direct
                consumption of the component constructor function.
                */
                $common.utils.defer(function () {
                    var c;
                    var componentCacheEntry = app.cache.componentCache.getEntry(componentName);
                    if (!componentCacheEntry) {
                        c = new componentEntry();
                        app.cache.componentCache.addEntry(componentName, c);
                    } else {
                        c = componentCacheEntry;
                    }
                    initializeComponent(view, c, componentId, target, app, isInjection);
                });
            }
        }
    }

    /**
     * TODO: document this function.
     */
    function initializeComponent(view, c, componentId, $component, app, isInjection) {
        var component;
        if (c && $component) {
            /*
            The component should have a render function that does its 
            work to render its view. When the component view is rendered,
            they can invoke our callback and give us the view for passing
            it into its constructor.
            */
            c.render(function (componentView) {
                //The view is rendered, and we have the view.s
                //Replace the [dsrt-component] element with the view element.
                if (isInjection) {
                    $component.append(componentView);
                } else {
                    $component.replaceContent(componentView);
                }
                //Call the component instance's constructor function that
                //exposes the components functionality.
                component = new c.constructor(componentView);

                if (app.providers.IDataBindingProvider) {
                    component.bindTemplateToData = app.providers.IDataBindingProvider.bindTemplateToData;
                }

                if (Array.isArray(c.constructorInstances)) {
                    //Push this instance into the instance cache.
                    c.constructorInstances.push(component);
                }
                /*
                Using the asyncResouce .notify() function, we can 
                now notify the controller that the component is 
                interactive and give it the component as the "this"
                arg. We'll also pass in the component as the first argument.
                */
                view.components[componentId].notify(component, [component]);
            });
        }
    }
})();