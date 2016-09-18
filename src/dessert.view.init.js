(function() {

    "use strict";

    define("dessert.view.init", [
        'dessert.common',
        'dessert.view',
        'dessert.control',
        'dessert.model',
        "dessert.routing",
        "dessert.component",
        "dessert.asyncresource",
        "jquery"
    ], function(
        common,
        View,
        Control,
        Model,
        $routing,
        $Component, //eslint-disable-line no-unused-vars
        $asyncResource,
        $
    ) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        return function($controller, controller, module, $module, app, args, page, callback) { //eslint-disable-line no-unused-vars
            var views;
            if ($controller) { //If no controller, we'll consider it a partial view.
                views = $controller.find(selectors.view);
            } else { //Look in the module definition for partial views.
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
            views.each(function() {
                $view = $(this);
                controls = $view.find(selectors.control);
                components = $view.find(selectors.component);
                view = new View($view.attr(attrs.view), controller, $view);
                modelMembers = {};
                models = $view.find(selectors.model);
                ctrlGroups = {};
                controlGroups = $view.find(selectors.controlGroup);
                //Init components.
                components.each(function() {
                    var component;
                    var $component;
                    var componentName;
                    var componentId;
                    var componentUrl;
                    $component = $(this);
                    componentName = $component.attr(attrs.component);
                    componentUrl = app.getComponent(componentName);
                    componentId = $component.prop(attrs.id);
                    view.components[componentId] = new $asyncResource();
                    if (componentUrl) {
                        require([componentUrl], function(_component) {
                            var c = new _component();
                            c.render($component, function(elem) {
                                component = new c.constructor(elem);
                                view.components[componentId].notify(component);
                            });
                        });
                    }
                });
                models.each(function() {
                    $model = $(this);
                    modelMembers[$model.attr(attrs.control)] = "";
                });
                controls.each(function() {
                    $control = $(this);
                    controlName = $control.attr(attrs.control);
                    control = new Control(controlName, $control, view);
                    view.controls.add(control);
                });
                controlGroups.each(function() {
                    $ctrlGroup = $(this);
                    ctrlGroupName = $ctrlGroup.attr(attrs.controlGroup);
                    if (!view.controlGroups[ctrlGroupName]) {
                        view.controlGroups[ctrlGroupName] = [];
                    }
                    view.controlGroups[ctrlGroupName].push($ctrlGroup);
                });
                //Instantiate the controller constructor
                model = new Model(modelMembers);
                if (controller) {
                    dsrtController = new controller.ctor(view, model, module, page, $routing);
                }
            });
        };
    })

})();