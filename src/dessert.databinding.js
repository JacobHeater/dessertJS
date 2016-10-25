/**
 * @file Exposes functionality for data binding in the dessertJS framework.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define("dessert.databinding", [
        "handlebars",
        "dessert.interfaces"
    ], dessertDataBindingModule);

    function dessertDataBindingModule(
        $handlebars,
        $interfaces
    ) {
        var dessertDataBinder = new $interfaces.IDataBindingProvider({
            bindTemplateToData: bindTemplateToData
        });

        var deferredAttrs = [{
            regex: /deferred-src/gmi,
            repl: "src"
        }];

        /**
         * Uses the mustache library to bind the given dataset to the
         * provided template.
         * 
         * @param {String} template The template to bind the data to.
         * @param {Object} data The data to bind to the view.
         * @returns {String} The data-bound template.
         */
        function bindTemplateToData(template, data) {
            var compiledTemplate = $handlebars.compile(template);
            var renderedHtml = compiledTemplate(data);
            deferredAttrs.forEach(function(attr) {
                renderedHtml = renderedHtml.replace(attr.regex, attr.repl);
            });

            return renderedHtml;
        }

        return dessertDataBinder;
    }
})();