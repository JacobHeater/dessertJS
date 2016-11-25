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
         * A dessertJS Component is a way of encapsulating a piece of logic for the application
         * in a class. The Component class enables the user to dictate how to render the Component,
         * but also to define instance methods on the Component that give it a unique API.
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

        /**
         * The constructor for the Component instance. Components are singletons, and their instances
         * are tracked in the instances array. 
         * 
         * @abstract
         */
        Component.prototype.constructor = common.utils.noop;
        /**
         * Provides the mechanism for binding a template to the given data object.
         * 
         * @abstract
         */
        Component.prototype.constructor.bindTemplateToData = common.utils.noop;
        /**
         * A function that aids in destroying this Component instance.
         * 
         * @abstract
         */
        Component.prototype.constructor.prototype.destroy = common.utils.noop;
        /**
         * A list of instances that are related to this Component.
         * 
         * @private
         */
        Component.prototype.constructorInstances = [];
        /**
         * A function that tells dessertJS how to render the Component.
         * 
         * @abstract
         */
        Component.prototype.render = common.utils.noop;
        /**
         * Components are singletons, and this aids in tracking the singleton
         * instance of the Component.
         * 
         * @private
         */
        Component.prototype.instance = null;
        /**
         * Components should be extended from the Component prototype.
         */
        Component.extend = extend.bind(Component);

        return Component;
    });
})();