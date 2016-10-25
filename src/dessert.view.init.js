/**
 * @file
 * @author Jacob Heater
 * @since
 */
(function () {

    "use strict";

    define("dessert.view.init", [
        "dessert.common",
        "dessert.view",
        "dessert.control",
        "dessert.model",
        "dessert.component",
        "dessert.asyncresource",
        "jquery"
    ], dessertViewInitModule);

    /**
     * Require entry point.
     * 
     * TODO: define params.
     */
    function dessertViewInitModule(
        $common,
        $View,
        $Control,
        $Model,
        $Component, //eslint-disable-line no-unused-vars
        $asyncResource,
        $jquery
    ) {
        var selectors = $common.selectors;
        var attrs = $common.attrs;

        return function dessertViewInit($controller, controller, module, $module, app, args, page, callback) { //eslint-disable-line no-unused-vars
            var views;

            if ($controller) {
                //If no controller, we'll consider it a partial view.
                views = $controller.find(selectors.view);
            } else {
                //Look in the module definition for partial views.
                views = $module.find(selectors.view);
            }

            var $view;
            var components;
            var controls;
            var controlGroups;
            var ctrlGroupName;
            var $ctrlGroup;
            var view;
            var modelMembers;
            var models;
            var $model;
            var $control;
            var controlName;
            var control;
            var model;
            var dsrtController; //eslint-disable-line no-unused-vars

            //We need to go through each view and start building out the view elements.
            views.each(function () {
                //Keep a reference to the jQuery view object.
                $view = $jquery(this);
                //Track the jQuery view object.
                app.trackedElements.add($view);
                //Find all of the [dsrt-control] elements housed in the view.
                controls = $view.find(selectors.control);
                //Find all of the [dsrt-component] elements housed in the view.
                components = $view.find(selectors.component);
                //Construct a new dessertJS View instance and initialize it.
                view = new $View($view.attr(attrs.view), controller, $view);
                /*
                Build out a new model for the view. Models are just dictionaries of view elements
                annotated with [dsrt-model] attributes. We'll essentially just put a key in the 
                dictionary with the model member name.
                */
                modelMembers = {};
                //Find all of the [dsrt-model] elements housed in the view.
                models = $view.find(selectors.model);
                //Find all of the [dsrt-controlGroup] elements housed in the view.
                controlGroups = $view.find(selectors.controlGroup);
                /*
                We should start with the components because this has the least impact
                on view initialization. Components are asynchronous by design. This
                makes it so that the main thread is not getting bogged down by initializing
                these components. We can go out and start building out these resources,
                and then when they're ready, we'll notify the controller that they're
                members of that they're ready to be interacted with.
                */
                components.each(function () {
                    var $component;
                    var componentName;
                    var componentId;
                    var componentEntry;
                    //Keep a reference to the component jquery object.
                    $component = $jquery(this);
                    //Track the component for destruction later.
                    app.trackedElements.add($component);
                    //Get the name of the component from the component element
                    //We're going to look it up in the dessertJS app configuration.
                    componentName = $component.attr(attrs.component);
                    //Find the component by name in the app configuration.
                    componentEntry = app.components.get(componentName);
                    //Because components require a unique name, we're goin to expect that the 
                    //component has an ID to identify it by.
                    componentId = $component.prop(attrs.id);
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
                            if (!app.components.instances[componentEntry]) {
                                require([componentEntry], function (_component) {
                                    if (_component) {
                                        //Let's instantiate the component using its constructor function.
                                        var c = new _component();
                                        app.components.instances[componentEntry] = c;
                                        initializeComponent(c, componentId, $component);
                                    }
                                });
                            } else {
                                $common.utils.defer(function () {
                                    var c = app.components.instances[componentEntry];
                                    initializeComponent(c, componentId, $component);
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
                                if (!app.components.instances[componentEntry.toString()]) {
                                    c = new componentEntry();
                                    app.components.instances[componentEntry.toString()] = c;
                                } else {
                                    c = app.components.instances[componentEntry.toString()];
                                }
                                initializeComponent(c, componentId, $component);
                            });
                        }
                    }
                });

                //Iterate over all of the [dsrt-model] members, and add them as modelMembers.
                models.each(function () {
                    $model = $jquery(this);
                    //Track the jQuery $model element.
                    app.trackedElements.add($model);
                    //Default all model members to an empty string.
                    modelMembers[$model.attr(attrs.control)] = $common.utils.emptyString;
                });

                //Iterate over all of the [dsrt-control] elements.
                controls.each(function () {
                    //Keep a reference to the jquery instance of the control element.
                    $control = $jquery(this);
                    app.trackedElements.add($control);
                    //Get the name of the control from the element.
                    controlName = $control.attr(attrs.control);
                    //Instantiate a new instance of the dessertJS Control class.
                    control = new $Control(controlName, $control, view, app);
                    //Add the new instance of the control to the view's controls dictionary.
                    view.controls.add(control);
                });

                //Iterate over all of the [dsrt-controlGroup] elements.
                controlGroups.each(function () {
                    //Keep a reference to the jquery object.
                    $ctrlGroup = $jquery(this);
                    app.trackedElements.add($ctrlGroup);
                    //Get the name of the control group.
                    ctrlGroupName = $ctrlGroup.attr(attrs.controlGroup);
                    /*
                    If the control group does not exist in yet, let's construct a new
                    array for hold all of the control group members in. The point of control
                    groups is to group common controls. When we want to repeat certain functionality
                    over all of the controls, we need to keep them together, and control groups allow
                    for that behvior.
                    */
                    if (!view.controlGroups[ctrlGroupName]) {
                        //Whoops, the control group doesn't exist. Create the array to group by.
                        view.controlGroups[ctrlGroupName] = [];
                    }
                    //Now we can add the control to the group.
                    view.controlGroups[ctrlGroupName].push($ctrlGroup);
                });
                //We have a model with all of its members. Create a new dessertJS Model instance.
                model = new $Model(modelMembers);
                if (controller) {
                    //Instantiate the controller using the controller's constructor function.
                    if (!(controller.instance || controller.instance instanceof controller.constructor)) {
                        controller.instance = new controller.constructor();
                    }
                    var scope = {
                        view: view,
                        model: model,
                        module: module,
                        page: page
                    };
                    
                    controller.instance.scope(scope);
                    controller.instance.init();
                }
            });

            /**
             * TODO: document this function.
             */
            function initializeComponent(c, componentId, $component) {
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
                        $component.replaceContent(componentView);
                        //Call the component instance's constructor function that
                        //exposes the components functionality.
                        component = new c.constructor(componentView);
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
        };
    }

})();