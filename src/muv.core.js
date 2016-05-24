
define([
        './muv.app',
        './muv.module',
        './muv.controller',
        './muv.view',
        './muv.model',
        './muv.control',
        './muv.common'
    ],
    function(App, Module, Controller, View, Model, Control, common) {
        var selectors = common.selectors;
        var attrs = common.attrs;
        var regex = common.regex;
        //This is a private wrapper for our $.muv object
        var $muv = {
            init: function() {
                var $ = _module.$();
                var $muv = this;
                var apps = $(selectors.app);
                var modules;
                var externalModules;
                var nExternalModules = 0;
                var nProcessedExternalModules = 0;
                var nRecurse = 0;
                var controllers;
                var models;
                var views;
                var controls;
                var $app;
                var $module;
                var $exMod;
                var $controller;
                var $model;
                var $view;
                var $control;
                var app;
                var module;
                var controller;
                var model;
                var view;
                var control;
                var controlName;
                var modelMembers;
                var muvController;
                var relationships;
                var relationship;
                apps.each(function(h) {
                    $app = $(this);
                    app = appCache[$app.attr(attrs.app)]; //Lookup the app in the cache
                    externalModules = $app.find(selectors.src);
                    var processExternalModules = function(index) {
                      if (externalModules.length > 0 && index < externalModules.length) {
                        $exMod = externalModules.eq(index);
                        $.ajax({
                            type: 'GET',
                            cache: false,
                            async: true,
                            url: "$base$modulePath.html".replace("$base", app.src).replace("$modulePath", $exMod.attr(attrs.src))
                        }).then(function(data) {
                            $exMod.append(data).removeAttr(attrs.src); //Remove the muv-src attribute so this doesn't get reprocessed.
                            setTimeout(function() {
                                processExternalModules(index + 1);
                            }, 0);
                        });
                      } else if (index >= externalModules.length && externalModules.length > 0) {
                        setTimeout(function() {
                          externalModules = $app.find(selectors.src);
                          processExternalModules(0); //Restart at zero and look for any missing links.
                        }, 0);
                      } else  {
                        //This means that all external modules have been processed. Call next event.
                        onExternalModulesProcessed();
                      }
                    };
                    processExternalModules(0); //Start recursive load of external modules.
                    //This is to be fired once external modules have been processed.
                    var onExternalModulesProcessed = function() {
                        modules = $app.find(selectors.module);
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
                                    muvController = new controller.ctor(view, model, module);
                                });
                            });
                            $(selectors.mask).removeAttr(attrs.mask);
                        });
                    };
                });
            }
        };
        //Extend the $ object with the muv namespace
        var appCache = {};
        var _$ = undefined;
        var _module = {
            $: function() {
                if (arguments.length === 1) {
                    _$ = arguments[0];
                    return this;
                }
                return _$;
            },
            preinit: function(handler) {
                handler.call(this);
                return this;
            },
            init: function() {
                $muv.init();
            },
            app: function(name) {
                var app = new App(name);
                return {
                    onInit: function(handler) {
                        if (typeof handler === 'function') {
                            handler.call(app);
                        }
                        return this;
                    },
                    cache: function() {
                        appCache[app.name] = app;
                        return this;
                    },
                    ready: function() {
                        if (appCache[app.name] === app) {
                            return appCache[app.name];
                        }
                        throw new Error("You did not add this application context to the muv appCache. You must call the \".cache()\" method before calling \".ready()\"");
                    }
                };
            }
        };
        return _module;
    }
);
