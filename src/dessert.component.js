(() => {

    'use strict';

    var uuid;
    var PropertyHelper;
    var Behavior;

    define(
        [
            'helpers/uuid',
            'helpers/property-helper',
            'dessert.behavior'
        ],
        main
    );

    function main(
        $uuid,
        $PropertyHelper,
        $Behavior
    ) {

        uuid = $uuid;
        PropertyHelper = $PropertyHelper;
        Behavior = $Behavior;

        return Component;
    }

    class Component {
        constructor(state, element, id) {
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
        static get name() {}

        /** 
         * @abstract
         * @instance
         */
        render() {}

        /**
         * @abstract
         * @instance
         */
        init(element) {}

        /**
         * @abstract
         * @virtual
         * @instance
         */
        destroy() {
            this.cleanupEventListeners();
        }

    }

    function addBehaviorMethods(instance) {
        let behaviors = {};

        let describe = (name, action) => {
            behaviors[name] = new Behavior(name, action);
        };

        let fire = (name, args) => {
            let behavior = behaviors[name];

            if (behavior) {
                behavior.fire(args);
            }
        };

        let when = (name, action) => {
            let behavior = behaviors[name];

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
        let cleanupEventListeners = () => {
            let clone = element.cloneNode(true);
            element.parentNode.replaceChild(clone, element);
            clone.remove();
        };

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'cleanupEventListeners',
            value: cleanupEventListeners
        }]);
    }

})();