define(['./loginConfig', '../app'], function (loginConfig, app) {
    "use strict";

    var module = app.module('loginModule');
    
    module.controller('loginController', function () {
        var view;
        var model;
        var page;

        this.scope = function (scope) {
            view = scope.view;
            model = scope.model;
            page = scope.page;
        };

        this.init = function () {
            loginConfig(model, view, this);
            view.controls.lblSalutation.dsrt.dataBind({
                salutation: "Welcome to the Login Example"
            });
            view.onLogin.addListener(function (m) {
                if (m.userName !== "" && m.password !== "") {
                    page.route('/home', [{
                        key: "userName",
                        value: model.userName
                    }]);
                } else {
                    view.invalidate();
                }
            });
        };
    });
    return module;
});