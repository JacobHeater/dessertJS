/**
 * @file Exposes functionality for data binding in the dessertJS framework.
 * @author Jacob Heater
 */
(function () {

    "use strict";

    define(dessertDataBindingModule);

    /**
     * The module handles data binding in dessertJS.
     * 
     * @returns {Object} The dessertJS data binding helper object.
     */
    function dessertDataBindingModule() {
        var dessertDatabindingUtil = {
            cleanupDeferredAttrs: cleanupDeferredAttrs
        };

        /**
         * Deferred attributes are attributes that are going to be replaced with
         * native HTML attributes, but have to be set during data binding, so that
         * the browser won't try to parse them when the view is bound. 
         */
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