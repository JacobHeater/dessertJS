(function() {
    "use strict";

    define(todoModule);

    function todoModule() {
        return addModuleToApp;
    }

    function addModuleToApp(app) {
        return app.module("todoModule");
    }
})();
