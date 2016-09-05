define(['./app.js'], function(app) {
    "use strict";
    
    var module = app.module('landingModule');

    module.controller('landingController', function(view, model, module, page) {
        var controls = view.controls;
        var lblUserName = controls.lblUserName;
        lblUserName.text(page.args.filter(function(kvp) {
          return kvp.key === "userName";
        }).map(function(kvp) {
          return kvp.value;
        })[0]);
    });

    app.init();
    return module;
});
