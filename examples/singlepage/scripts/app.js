define([
    'dessert.core',
    'dessert.interfaces',
    "jquery",
    "handlebars"
], function (dessert, interfaces, $, handlebars) {
    "use strict";

    return dessert
        .app('package', function () {
            this.src = "./views/";
            this.templates = "./templates/";
            this.providers.jquery = $;
            this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
                bindTemplateToData: function(template, data) {
                    var compiled = handlebars.compile(template);

                    return compiled(data);
                }
            });
        });
});