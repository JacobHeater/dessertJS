(function () {
    'use strict';

    define([
        "./app.setup"
    ], main);

    function main(
        appSetup
    ) {

        return function initTodoApp(app) {
            app.registerTags([{
                name: "todoList",
                renderAs: app.customTagTypes.component,
                renderAsValue: "todoList",
                tag: "todoList"
            }]);

            app.components.register([{
                name: "todoList",
                entry: "./components/todo/todo"
            }]);

            appSetup(app);
        };
    }

})();