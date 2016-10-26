(function () {
    "use strict";

    define("dessert.jquery.extend", dessertJqueryExtensionsModule);

    function dessertJqueryExtensionsModule() {
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