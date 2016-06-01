define(['./loginConfig', '../app'], function(loginConfig, app) {
    var module = app.module('loginModule');
    module.controller('loginController', function(view, model, module, page) {
        loginConfig(model, view, this);
        view.onLogin.addListener(function(m) {
            if (m.userName !== "" && m.password !== "") {
              page.route('/home', [{
                  key: "userName",
                  value: model.userName
              }]);
            } else {
              view.invalidate();
            }
        });
    });
    return module;
});
