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
         * @returns {jQuery} jQuery.
         */
        return function extendJQuery($) {
            /**
             * Clears the html contents of the element, and sets the content of the element.
             * 
             * @param {Element|String} content The content to append to the element.
             * @returns {Object} The jQuery object that is being extended.
             */
            $.fn.setContent = function (content) {
                return this.html("").append(content);
            };

            /**
             * Replaces this DOM element with the given content.
             * 
             * @param {Element|String} content The content to replace the current element with.
             * @returns {Object} The jQuery object that is being extended.
             */
            $.fn.replaceContent = function (content) {
                return this.replaceWith(content);
            };

            /**
             * Returns the outer HTML of the DOM element.
             * 
             * @returns {String} The outer HTML of the current element.
             */
            $.fn.outerHtml = function() {
                return this.get(0).outerHTML;
            };

            return $;
        };
    }
})();