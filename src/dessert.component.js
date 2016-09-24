/**
 * @file TODO: document
 * @author Jacob Heater
 * @since 09/18/2016
 */
(function() {
    "use strict";

    define("dessert.component", ["dessert.common"], function dessertComponentModule(common) {

        /**
         * TODO: document component
         * 
         * @class
         */
        function Component() {

        }

        /**
         * Allows one prototype to extend another.
         */
        function extend(child) {
            child.prototype = Object.create(this.prototype);
            child.prototype.constructor = child;
            child.extend = extend.bind(child);
            return child;
        }

        Component.prototype.constructor = common.utils.noop;
        Component.prototype.render = common.utils.noop;
        Component.extend = extend.bind(Component);

        return Component;
    });
})();