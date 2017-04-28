/**
 * @file Defines the PropertyHelper module for dessertJS to add read-only properties
 *       to JavaScript objects.
 * @since 04/15/2017
 * @author Jacob Heater
 */
(() => {

    'use strict';

    const HELPER = {
        addReadOnlyProperties: addReadOnlyProperties,
        addReadOnlyProperty: addReadOnlyProperty
    };

    define(main);

    /**
     * Entry point for the PropertyHelper module.
     * 
     * @returns {Object} The helper object.
     */
    function main() {
        return HELPER;
    }

    /**
     * Adds a set of read-only properties to a given object.
     * 
     * @param {Object} obj The object to add read-only properties to.
     * @param {Object[]} props The name value pairs of the properites.
     */
    function addReadOnlyProperties(obj, props) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];

            addReadOnlyProperty(obj, prop.name, prop.value);
        }
    }

    /**
     * Adds a read-only property to the given object.
     * 
     * @param {Object} obj The object to add the read-only property to.
     * @param {String} name The name of the property to add.
     * @param {*} value The value of the property.
     */
    function addReadOnlyProperty(obj, name, value) {
        Object.defineProperty(obj, name, {
            writable: false,
            value: value
        });
    }

})();
