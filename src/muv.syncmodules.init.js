define([
    './muv.common',
    './muv.module',
    './muv.controller',
    './muv.view',
    './muv.model',
    './muv.control',
    './muv.page'
], function(common, Module, Controller, View, Model, Control, Page) {
    return function($app, app, args) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        return function onExternalModulesProcessed() {
            var $page;
            var page;
            var modules;
            var controllers;
            var models;
            var views;
            var controls;
            var $module;
            var $controller;
            var $model;
            var $view;
            var $control;
            var module;
            var controller;
            var model;
            var view;
            var control;
            var controlName;
            var modelMembers;
            var muvController;
            modules = $app.find(selectors.module);
            $page = $app.find(selectors.page).eq(0);
            if ($page && $page.length > 0) {
              page = new Page(app, args);
            }
            modules.each(function(i) {
                $module = $(this);
                var controllers = $module.find(selectors.controller);
                module = app.modules.get($module.attr(attrs.module));
                controllers.each(function(j) {
                    $controller = $(this);
                    view = $controller.find(selectors.view);
                    controller = module.controllers.get($controller.attr(attrs.controller));
                    view.each(function(k) {
                        $view = $(this);
                        controls = $view.find(selectors.control);
                        view = new View($view.attr(attrs.view), controller);
                        modelMembers = {};
                        models = $view.find(selectors.model);
                        models.each(function(l) {
                            $model = $(this);
                            modelMembers[$model.attr(attrs.control)] = "";
                        });
                        controls.each(function(l) {
                            $control = $(this);
                            controlName = $control.attr(attrs.control);
                            control = new Control(controlName, $control, $);
                            view.controls.add(control);
                        });
                        //Instantiate the controller constructor
                        model = new Model(modelMembers);
                        muvController = new controller.ctor(view, model, module, page);
                    });
                });
                $(selectors.mask).removeAttr(attrs.mask);
            });
        };
    };
});
