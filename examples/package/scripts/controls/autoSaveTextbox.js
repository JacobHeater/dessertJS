define(['../app', './autoSaveTextboxSetup'], function (app, setup) {

    "use strict";

    var module = app.module('autoSaveTextbox');
    module.controller('autoSaveTextboxController', function (view, model) {
        var view;
        var model;
        this.scope = function (scope) {
            view = scope.view;
            model = scope.model;
        };

        this.init = function () {
            //Use the autoSaveTextboxSetup package to setup the view controls, and events.
            //This makes it so we can use someone else's logic against our view, and just hook
            //into their events. The benefit of this is that we can achieve event driven modules.
            setup(model, view, this);
            //These are the events that we can hook into with this module.
            //The setup function configures the module for us so we can leverage the logic from their setup function.
            //Of course, as usual, you can still write your own logic for the controls, if you wish.
            view.nameChanged.addListener(function (old, value) {
                view.controls.console.log("The value of the name textbox changed from $old to $value.".replace("$value", value).replace("$old", old || '""'));
            });
            view.ageChanged.addListener(function (old, value) {
                view.controls.console.log("The value of the age textbox changed from $old to $value.".replace("$value", value).replace("$old", old || '""'));
            });
            view.doneEditing.addListener(function () {
                view.controls.console.log("Saving the model in its current state: $model".replace("$model", JSON.stringify(model)));
                setTimeout(function () {
                    view.controls.console.log("Saved!");
                }, 1500);
            });
        };
    });

    app.init();

    return module;
});