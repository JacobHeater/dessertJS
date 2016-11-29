(function () {
    'use strict';

    define([
        "../../lib/dessertJS/dessert.customtag",
        "./app.setup"
    ], main);

    function main(
        customTag,
        appSetup
    ) {

        return function initTodoApp(app) {
            app.registerTags([
                customTag.create({
                    name: "todoList",
                    renderAs: customTag.types.component,
                    renderAsValue: "todoList",
                    tag: "todoList"
                })
            ]);

            app.components.register([{
                name: "todoList",
                entry: "./components/todo/todo"
            }]);

            appSetup(app);
        };
    }

})();