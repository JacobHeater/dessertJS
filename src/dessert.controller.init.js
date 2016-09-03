define([
    './dessert.common',
    './dessert.view.init',
    "jquery"
], function(common, viewInit, $) {
    "use strict";
    var selectors = common.selectors;
    var attrs = common.attrs;
    return function($module, module, app, args, page, callback) {
        var controllers = $module.find(selectors.controller);
        var $controller;
        var controller;
        if (controllers.length > 0) {
            controllers.each(function(j) {
                $controller = $(this);
                if (!callback) {
                    controller = module.controllers.get($controller.attr(attrs.controller));
                    controller.$controller = $controller;
                }
                viewInit($controller, controller, module, $module, app, args, page, callback);
            });
        } else {
            //Handle partial view init
            viewInit($controller, controller, module, $module, app, args, page, callback)
        }
    };
});