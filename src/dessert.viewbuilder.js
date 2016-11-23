(function () {
    "use strict";

    define([
        "./dessert.common",
        "./dessert.view",
        "./dessert.model",
        "./dessert.customtag",
        "./dessert.component",
        "./dessert.viewhelpers"
    ], dessertViewBuilderModule);

    function dessertViewBuilderModule(
        $common,
        $View,
        $Model,
        $customTag,
        $component$, //eslint-disable-line no-unused-vars
        $viewHelpers
    ) {
        /**
         * Builds out the given $view element using the give application and module information
         * to lookup the components and controls that belong to this view.
         * 
         * @param {Element} $view The DOM element that represents the view to be built.
         * @param {Controller} controller The dessert controller instance that binds the view with the model.
         * @param {Module} module The dessert module instance that contains this view and controller.
         * @param {Application} app The dessert application instance that contains the module, view and controller instances.
         * @param {any} args Any arguments that are to be passed along to the controller when the view is loaded.
         * @param {Page} page The dessert page instance that contains the view.
         * @param {Boolean} isRefresh Indicates whether the view builder was called from initialization of refresh.
         * @param {Object} refreshModel The model to use when the view is refreshed.
         */
        return function dessertViewBuilder($view, controller, module, app, args, page, isRefresh, refreshModel) {

            var $jquery = null;
            var selectors = $common.selectors;
            var attrs = $common.attrs;

            if (app.providers.jquery) {
                $jquery = app.providers.jquery;
            }

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
            var model;
            var dsrtController; //eslint-disable-line no-unused-vars

            //Bind the controller to the view
            if (!isRefresh && controller && controller.instance && $common.utils.isFunction(controller.instance.dataBind)) {
                var dataBoundView = controller.instance.dataBind($view.outerHtml());
                var $dataBoundView = $jquery(dataBoundView);

                $view.replaceContent($dataBoundView);
                $view = $dataBoundView;
            }
            //Track the jQuery view object.
            app.trackedElements.add($view);
            //Find all of the [dsrt-control] elements housed in the view.
            controls = $view.find(selectors.control);
            //Find all of the [dsrt-component] elements housed in the view.
            components = $view.find(selectors.component);
            //Construct a new dessertJS View instance and initialize it.
            view = new $View($view, $view.attr(attrs.view), app, module, controller, args, page);
            //Provide capability to re-initialize the view.
            view.refresh = function (partial) {
                var _view = partial || $view;
                $customTag.init(app);
                dessertViewBuilder(_view, controller, module, app, args, page, true, model);
                return this;
            };
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
                var $component = $(this);
                var componentName = $component.attr(attrs.component);
                $viewHelpers.renderComponent(app, view, $component, componentName);
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
                //Get the name of the control from the element.
                controlName = $control.attr(attrs.control);
                $viewHelpers.renderControl(app, view, $control, controlName);
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
            model = !isRefresh ? new $Model(modelMembers) : refreshModel;
            if (controller && controller.instance) {

                var scope = {
                    view: view,
                    model: model,
                    module: module,
                    page: page,
                    args: args
                };

                controller.instance.scope(scope);

                if (!isRefresh && !controller.instance.isAsync) {
                    controller.instance.init();
                }
            }
        }
    }
})();