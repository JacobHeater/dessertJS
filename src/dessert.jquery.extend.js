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
            $.fn.outerHtml = function () {
                return this.get(0).outerHTML;
            };

            /**
             * Determines if the element is within the parent selector.
             * 
             * Based on: http://stackoverflow.com/questions/2389540/jquery-hasparent
             * 
             * @param {String} pSelector The selector of the parent element.
             * @returns {Boolean} A flag indicating if the element(s) is in the parent selector.
             */
            $.fn.isWithin = function (pSelector) {
                return this.filter(function () {
                    // Return truthy/falsey based on presence in parent
                    return $(this).closest(pSelector).length;
                }).length;
            };

            /**
             * Returns a boolean indicating if the element contains the selector or not.
             * 
             * @param {String} selector The selector to lookup.
             * @returns {Boolean}
             */
            $.fn.contains = function(selector) {
                return this.find(selector).length > 0;
            };

            /**
             * Returns a boolean indicating if the element is any of the given selectors.
             * 
             * @param {...String} selectors The selectors to lookup.
             * @returns {Boolean}
             */
            $.fn.isAny = function() {
                var isAny = false;
                var selector;

                for (var i = 0; i < arguments.length; i++) {
                    selector = arguments[i];
                    if (this.is(selector)) {
                        isAny = true;
                        break;
                    }
                }

                return isAny;
            };

            /**
             * Returns a boolean indicating if the element
             * has the given attribute name.
             * 
             * @param {String} attrName The name of the attribute to verify.
             * @returns {Boolean}
             */
            $.fn.hasAttr = function(attrName) {
                return !!this.attr(attrName);
            };

            if ($.fn.addBack && !$.fn.andSelf) {
                //This version of jQuery does not support $.fn.andSelf.
                //Let's add a pointer to andSelf.
                $.fn.andSelf = $.fn.addBack;
            }

            return $;
        };
    }
})();