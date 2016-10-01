(function () {
    "use strict";

    define("dessert.jquery.extend", ["jquery"], dessertJqueryExtensionsModule);

    function dessertJqueryExtensionsModule(jquery) {
        jquery.fn.setContent = function(content) {
            return this.html("").append(content);
        };

        jquery.fn.replaceContent = function(content) {
            return this.replaceWith(content);
        };
        
        return jquery;
    }
})();