(function() {
    "use strict";

    define([
        "../../controllers/todo/todoController",
        "../../modules/todo/todoModule"
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
