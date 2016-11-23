/**
 * @file TODO: document
 * @author Jacob Heater
 * @since 09/18/2016
 */
(function() {
    "use strict";

    define(["./dessert.common"], function dessertComponentModule(common) {

        /**
         * @class
         * 
         * @classdesc
         * 
         * TODO: document....
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
        Component.prototype.constructor.bindTemplateToData = common.utils.noop;
        Component.prototype.constructor.prototype.destroy = common.utils.noop;
        Component.prototype.constructorInstances = [];
        Component.prototype.render = common.utils.noop;
        Component.prototype.instance = null;
        Component.extend = extend.bind(Component);

        return Component;
    });
})();