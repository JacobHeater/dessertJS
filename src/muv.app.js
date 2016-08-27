/**************************
@file The class definition for the muvJS App class. The App class defines the scope of the application context as defined by the element that wraps the application.
Example of an application definition in the markup is <div muv-app="my-first-muv-app"></div>
@author Jacob Heater
***************************/
﻿define(['./muv.module', './muv.common'], function (Module, Common) {
    "use strict";
    var App = function (name, muv, $app) {
        this.name = name || "";
        var modules = {};
        this.module = function (name, globals) {
            modules[name] = new Module(name, this, globals);
            return modules[name];
        };
        this.modules = {
            get: function (name) {
                return modules[name];
            },
            remove: function (name) {
                delete modules[name];
                return this;
            }
        };
        this.init = function(args) {
          muv.init(args);
          return this;
        };
        this.pageInit = function(args) {
          muv.pageInit(args);
          return this;
        };
        this.$app = $app;
        this.src = "";
        this.templates = "";
        this.muvPath = "";
        this.pathTypes =  Common.pathTypes;
    };
    return App;
});
