(() => {

    'use strict';

    define(main);

    function main() {
        return DomHelper;
    }

    class DomHelper {
        constructor() {

        }

        static createDocFrag(string) {
            return document.createRange().createContextualFragment(string);
        }

        static emptyElement(element) {
            if (element && element.hasChildNodes()) {
                while (element.lastChild) {
                    element.removeChild(element.lastChild);
                }
            }
        }
    }

})();
