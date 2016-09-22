/**
 * @file TODO: document
 * @author Jacob Heater
 * @since 09/18/2016
 */
(function() {
    "use strict";

    define("dessert.component", ["dessert.common"], function(common) {

        /**
         * TODO: document component
         * 
         * @class
         */
        function Component() {

        }

        function inherit(child) {
            child.prototype = Object.create(this.prototype);
            child.prototype.constructor = child;
            child.inherit = inherit.bind(child);
            return child;
        }

        Component.prototype.constructor = common.utils.noop;
        Component.prototype.render = common.utils.noop;

        Component.inherit = inherit.bind(Component);

        return Component;
    });
})();