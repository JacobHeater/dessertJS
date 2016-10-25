define([
    'dessert.core',
    "dessert.interfaces",
    "./lib/mustache/mustache.min"
], function (dessert, interfaces, mustache) {
    "use strict";
    return dessert
        .app('app', function () {
            this.src = "./views/";
            this.templates = "./templates/";
            this.dessertPath = "./scripts/dessert/";
            this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
                bindTemplateToData: function (template, data) {
                    var renderedHtml = mustache.render(template, data);
                    return renderedHtml;
                }
            });
        });
});