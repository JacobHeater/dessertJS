define([
    '../../../bin/dessertJS/dessert.core',
    "../../../bin/dessertJS/dessert.interfaces",
    "./lib/mustache/mustache.min",
    "jquery"
], function (dessert, interfaces, mustache, $) {
    "use strict";
    return dessert
        .app('app', function () {
            this.src = "./views/";
            this.templates = "./templates/";
            this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
                bindTemplateToData: function (template, data) {
                    var renderedHtml = mustache.render(template, data);
                    return renderedHtml;
                }
            });
            this.providers.jquery = $;
            this.maskLifted = function() {
                $("[init-loader]").remove();
            };
        });
});