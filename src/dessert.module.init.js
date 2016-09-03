define([
    './dessert.controller.init',
    './dessert.common',
    './dessert.page',
    './dessert.routing',
    "jquery"
], function(
    controllerInit,
    common,
    Page,
    routing,
    $
) {
    "use strict";
    var selectors = common.selectors;
    var attrs = common.attrs;
    return function($context, app, args, callback) {
        var page;
        var modules;
        var $page;
        var $module;
        var module;
        var views;
        var $view;
        modules = $context.find(selectors.module);
        if (modules.length === 0) {
            //Handle partial views
            views = $context.find(selectors.view);
            views.each(function(i) {
                $view = $(this);
                $view.wrap('<div />').parent().attr(attrs.module, $view.attr(attrs.view).concat('$partial'));
            });
            modules = $context.find(selectors.module);
        }
        $page = $context.find(selectors.page).eq(0);
        if ($page && $page.length > 0) {
            page = new Page(app, $page, args);
            if (!routing.hasRoute()) {
                routing.setRoute($page.attr(attrs.page), args);
            }
        }
        modules.each(function(i) {
            $module = $(this);
            module = app.modules.get($module.attr(attrs.module));
            if (module) {
                module.$module = $module;
            }
            controllerInit($module, module, app, args, page, callback);
        });
        if (typeof callback === "function") {
            callback(app, $context, args);
        }
    };
});