/**********************************
@file Extensions of the dessertJS Control, which be nature is just a jQuery object. These are simply just extensions of the jQuery object, which are added to the dsrt "namespace."
@author Jacob Heater
***********************************/
define([
    './dessert.control.repeat',
    './dessert.common',
    './dessert.ajax',
    './dessert.context.init',
    "jquery"
], function(repeater, common, ajax, contextInit, $) {
    "use strict";
    var attrs = common.attrs;
    var selectors = common.selectors;
    //The $ factory element result to extend with the dsrt object.
    return function(element) {
        element.dsrt.bind = function(model) {
            if (model) {
                //First init the control with the model value
                element.val(model[element.attr(attrs.control)]);
                //Then set the handler to track the changes.
                element.on('keyup keydown change', function() {
                    //TODO: Handle different types of controls such as SELECT and RadioButton
                    model[$(this).attr(attrs.control)] = ($(this).val() || $(this).text());
                });
            }
            return this;
        };
        element.dsrt.watch = function(watcher) {
            if (typeof watcher === 'function') {
                element.on('keyup keydown change', function() {
                    watcher.call($(this));
                });
            }
            return this;
        };
        element.dsrt.src = function(path) {
            return {
                path: path
            };
        };
        element.dsrt.on = function(event, handler) {
            element.on(event, handler);
            return this;
        };
        element.dsrt.jq = element;
        element.dsrt.load = function(path, callback) {
            var app = element.dsrt.view.controller.module.app;
            var dsrtPath = app.dsrtPath;
            require([
                dsrtPath.concat('dsrt.context.init'),
                dsrtPath.concat('dsrt.externalmodules.init')
            ], function(contextInit, externalInit) {
                ajax.get(path.path)
                    .then(function(data) {
                        element.children().remove();
                        element.append(data);
                        var asyncInit = externalInit(element, app);
                        asyncInit(0, function() {
                            contextInit(element, element.dsrt.view.controller.module.app, {}, callback);
                        });
                    });
            });
        };
        element.dsrt.outerHtml = function($elem) {
            return common.utils.getOuterHtml($elem);
        };
        element.dsrt.repeat = repeater(selectors, attrs, element);
    };
});