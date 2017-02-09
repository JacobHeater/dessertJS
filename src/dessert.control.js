/**
@file The dessertJS Control class is simply just a decorator that adds some dessertJS dependencies to the jQuery element that is given as the element argument.
@author Jacob Heater
*/
(function() {

    "use strict";

    define(['./dessert.control.extensions'], dessertControlModule);

    /**
     * RequireJS entry point.
     * 
     * @param {Function} extender The dessertJS control extender that initializes control extensions.
     * @returns {Function} The Control prototype.
     */
    function dessertControlModule(extender) {

        /**
         * Represents a control in dessertJS.
         * 
         * This function decorates a jQuery object with the dessertJS
         * attributes that describe this control.
         * 
         * @param {String} name The name of the control.
         * @param {Object} element The jQuery instance of the DOM element that represents the control.
         * @param {Object} view The view instance that this control is linked to.
         * @param {Object} app The dessertJS application instance.
         * @returns {Object} The decorated jQuery object instance.
         */
        function Control(name, element, view, app) {
            //This just ensures that we don't accidentally override any current instance to the dsrt object.
            /**
             * element.dsrt namespace for the dessertJS extensions of the
             * jQuery instance.
             * 
             * @type {Object}
             */
            element.dsrt = element.dsrt || {};
            /**
             * The name of the dessertJS control instance. When accessing this control
             * in the view controls hash table, you will look up the controls
             * by their names.
             * 
             * @type {String}
             */
            element.dsrt.name = name;
            /**
             * The dessertJS view that this control is associated with.
             * 
             * @type {Object}
             */
            element.dsrt.view = view;

            /**
             * Call the $.fn.remove() function.
             */
            element.destroy = function() {
                element.off("**");
                element.remove();
            };
            //Extend the dessertJS control.
            extender(element, app, view);
            return element;
        };

        return Control;
    }
})();