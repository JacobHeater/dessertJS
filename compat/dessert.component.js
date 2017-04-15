(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var uuid;
    var PropertyHelper;
    var Behavior;

    define(['helpers/uuid', 'helpers/property-helper', 'dessert.behavior'], main);

    function main($uuid, $PropertyHelper, $Behavior) {

        uuid = $uuid;
        PropertyHelper = $PropertyHelper;
        Behavior = $Behavior;

        return Component;
    }

    var Component = function () {
        function Component(state, element, id) {
            _classCallCheck(this, Component);

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'instanceId',
                value: uuid()
            }, {
                name: 'id',
                value: id
            }, {
                name: 'state',
                value: state
            }]);

            addElementMethods(this, element);
            addBehaviorMethods(this);
        }

        /**
         * @abstract
         * @instance
         */


        _createClass(Component, [{
            key: 'render',


            /** 
             * @abstract
             * @instance
             */
            value: function render() {}

            /**
             * @abstract
             * @instance
             */

        }, {
            key: 'init',
            value: function init(element) {}

            /**
             * @abstract
             * @virtual
             * @instance
             */

        }, {
            key: 'destroy',
            value: function destroy() {
                this.cleanupEventListeners();
            }
        }], [{
            key: 'name',
            get: function get() {}
        }]);

        return Component;
    }();

    function addBehaviorMethods(instance) {
        var behaviors = {};

        var describe = function describe(name, action) {
            behaviors[name] = new Behavior(name, action);
        };

        var fire = function fire(name, args) {
            var behavior = behaviors[name];

            if (behavior) {
                behavior.fire(args);
            }
        };

        var when = function when(name, action) {
            var behavior = behaviors[name];

            if (behavior) {
                behavior.addListener(action);
            }
        };

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'describe',
            value: describe
        }, {
            name: 'fire',
            value: fire
        }, {
            name: 'when',
            value: when
        }]);
    }

    function addElementMethods(instance, element) {
        var cleanupEventListeners = function cleanupEventListeners() {
            var clone = element.cloneNode(true);
            element.parentNode.replaceChild(clone, element);
            clone.remove();
        };

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'cleanupEventListeners',
            value: cleanupEventListeners
        }]);
    }
})();