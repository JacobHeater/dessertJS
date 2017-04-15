(function () {

    'use strict';

    var HELPER = {
        addReadOnlyProperties: addReadOnlyProperties,
        addReadOnlyProperty: addReadOnlyProperty
    };

    define(main);

    function main() {
        return HELPER;
    }

    function addReadOnlyProperties(obj, props) {
        for (var i = 0; i < props.length; i++) {
            var prop = props[i];

            addReadOnlyProperty(obj, prop.name, prop.value);
        }
    }

    function addReadOnlyProperty(obj, name, value) {
        Object.defineProperty(obj, name, {
            writable: false,
            value: value
        });
    }
})();