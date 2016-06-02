define(function() {
    "use strict";
    //A Controller does the work of binding the Model <--> View
    var Controller = function(name, module, $controller, implementation) {
        this.name = name || "";
        this.module = module;
        this.$controller = $controller;
        this.ctor = implementation || function() {};
    };
    return Controller;
});
