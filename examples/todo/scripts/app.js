(function () {
    "use strict";

    define([
        "jquery",
        "handlebars",
        "dessert.core",
        "dessert.interfaces",
        "dessert.customtag",
        "./app.setup"
    ], appModule);

    function appModule(
        $,
        handlebars,
        dessert,
        interfaces,
        customTag,
        appSetup
    ) {
        var todoApp = dessert.app("todo", function () {
            this.src = "./views/";
            this.templates = "./templates/";
            this.providers.jquery = $;
            this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
                bindTemplateToData: function (template, data) {
                    var compiledTemplate = handlebars.compile(template);

                    return compiledTemplate(data);
                }
            });
            this.registerTags([
                customTag.create({
                    name: "todoList",
                    renderAs: customTag.types.component,
                    renderAsValue: "todoList",
                    tag: "todoList"
                })
            ]);
            this.components.register([{
                name: "todoList",
                entry: "./components/todo"
            }]);
        });

        appSetup(todoApp);

        todoApp.init();

        return todoApp;
    }
})();