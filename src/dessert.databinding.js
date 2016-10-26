/**
 * @file Exposes functionality for data binding in the dessertJS framework.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define("dessert.databinding", dessertDataBindingModule);

    function dessertDataBindingModule() {
        var dessertDatabindingUtil = {
            cleanupDeferredAttrs: cleanupDeferredAttrs
        };

        var deferredAttrs = [{
            regex: /deferred-src/gmi,
            repl: "src"
        }];

        /**
         * Cleans up any deferred-* attributes from the databound template.
         * 
         * @param {String} template The databound template.
         * @param {String} The cleaned databound template.
         */
        function cleanupDeferredAttrs(template) {

            deferredAttrs.forEach(function (attr) {
                template = template.replace(attr.regex, attr.repl);
            });

            return template;
        }

        return dessertDatabindingUtil;
    }
})();