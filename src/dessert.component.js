(() => {

    'use strict';

    var uuid;
    var PropertyHelper;
    var Behavior;
    var ResourceRequest;
    var Status;

    define(
        [
            'helpers/uuid',
            'helpers/property-helper',
            'dessert.behavior',
            'dessert.resourcerequest',
            'dessert.status'
        ],
        main
    );

    function main(
        $uuid,
        $PropertyHelper,
        $Behavior,
        $ResourceRequest,
        $Status
    ) {

        uuid = $uuid;
        PropertyHelper = $PropertyHelper;
        Behavior = $Behavior;
        ResourceRequest = $ResourceRequest;
        Status = $Status;

        return Component;
    }

    class Component {
        constructor(app, state, element, id) {
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
            addResourceMethods(this, app);
        }   

        /**
         * @abstract
         * @instance
         */
        static get name() {}

        /**
         * @static
         * @param {String} name The name of the resource.
         */
        static resource(name) {
            return new ResourceRequest(name);
        }

        /** 
         * @abstract
         * @instance
         */
        render() {}

        /**
         * @abstract
         * @instance
         * @param {Element} element The DOM element that represents this component.
         */
        api(element) {}

        /**
         * @abstract
         * @instance
         */
        init(element) {
            this.api(element);
        }

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

    function addResourceMethods(instance, app) {
         instance.requestResource = function requestResource(resourceName) {
            let resource = app.resources()[resourceName];

            if (resource) {
                return resource.content;
            } else {
                return Status.NOT_FOUND;
            }
         };
    }

})();