(function () {
    'use strict';

    define([
            "../lib/dessertJS/dessert.core",
            "../lib/dessertJS/dessert.interfaces",
            "jquery",
            "handlebars",
            "./books/booksearch",
            "./countries/countries",
            "./todo/todo.js",
            './data-binding/data-binding.js',
            './authentication/authentication.js',
            './shopping/shopping.js'
        ],
        main);

    function main(
        dessert,
        interfaces,
        $,
        handlebars,
        initBookSearch,
        initCountrySearch,
        initTodo,
        initDataBinding,
        initAuthModule,
        initShopping
    ) {
        var app = dessert.app("dessertJSExamples", function () {
            this.src = "./views/";
            this.templates = "./templates/";
            this.providers.jquery = $;
            this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
                bindTemplateToData: function (template, data) {
                    var compiledTemplate = handlebars.compile(template);
                    return compiledTemplate(data);
                }
            });
        });

        initBookSearch(app);
        initCountrySearch(app);
        initTodo(app);
        initDataBinding(app);
        initAuthModule(app);
        initShopping(app);

        app.init();

        return app;
    }
})();