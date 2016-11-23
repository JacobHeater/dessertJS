(function () {
    "use strict";

    define(dessertJqueryExtensionsModule);
    /**
     * A module for extending jQuery with plugins.
     * 
     * @returns {Function} The function that extends jQuery.
     */
    function dessertJqueryExtensionsModule() {
        /**
         * The function that extends the jQuery namespace.
         * 
         * @param {jQuery} $ The jQuery function to extend.
         * @returns {jQuery} The extended jQuery function.
         */
        return function extendJQuery($) {
            $.fn.setContent = function (content) {
                return this.html("").append(content);
            };

            $.fn.replaceContent = function (content) {
                return this.replaceWith(content);
            };

            $.fn.outerHtml = function() {
                return this.get(0).outerHTML;
            };

            return $;
        };
    }
})();