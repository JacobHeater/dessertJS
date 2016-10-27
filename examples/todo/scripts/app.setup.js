(function() {
    "use strict";

    define([
        "../controllers/todoController",
        "../modules/todoModule"
    ], appSetupModule)

    function appSetupModule (
        todoControllerSetup,
        todoModuleSetup
    ) {
        return function appSetup(app) {
            var todoModule = todoModuleSetup(app);
            todoControllerSetup(todoModule);

            return app;
        };
    }
    
})();
