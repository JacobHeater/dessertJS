(() => {

    'use strict';

    var uuid;
    var PropertyHelper;
    var ResourceHelper;
    var DomHelper;
    var Behavior;
    var ResourceRequest;
    var Status;

    define(
        [
            'helpers/uuid',
            'helpers/property-helper',
            'helpers/resource-helper',
            'helpers/dom-helper',
            'dessert.behavior',
            'dessert.resourcerequest',
            'dessert.status'
        ],
        main
    );

    function main(
        $uuid,
        $PropertyHelper,
        $ResourceHelper,
        $DomHelper,
        $Behavior,
        $ResourceRequest,
        $Status
    ) {

        uuid = $uuid;
        PropertyHelper = $PropertyHelper;
        ResourceHelper = $ResourceHelper;
        DomHelper = $DomHelper;
        Behavior = $Behavior;
        ResourceRequest = $ResourceRequest;
        Status = $Status;

        return Component;
    }

    class Component {
        constructor(resources, state, element, id) {
            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'instanceId',
                value: uuid()
            }, {
                name: 'id',
                value: id
            }, {
                name: 'state',
                value: state
            }, {
                name: 'type',
                value: 'component'
            }]);

            addElementMethods(this, element);
            addBehaviorMethods(this);
            addResourceMethods(this, resources);
            addControlMethods(this);
            addComponentMethods(this);
        }

        static createElement(html) {
            return DomHelper.createDocFrag(html);
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
            let behavior = behaviors[name] = new Behavior(name, action);
            return behavior;
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
            let clone = element.clone();
            element.replaceWith(clone);
            clone.remove();
        };

        let find = function find(selector) {
            return element.find(selector, element.element);
        };

        let findAll = function findAll(selector) {
            return element.findAll(selector, element.element);
        };

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'cleanupEventListeners',
            value: cleanupEventListeners
        }, {
            name: 'find',
            value: find
        }, {
            name: 'findAll',
            value: findAll
        }]);
    }

    function addResourceMethods(instance, resources) {
        instance.requestResource = function requestResource(resourceName) {
            return ResourceHelper.requestResource(resources, new ResourceRequest(resourceName));
        };
    }

    function addControlMethods(instance) {
        var controls = {};

        Object.assign(instance, {
            registerControl(name, control) {
                controls[name] = control;
                return this;
            },

            removeControl(name) {
                delete controls[name];
                return this;
            },

            get controls() {
                return controls;
            }
        });
    }

    function addComponentMethods(instance) {
        var components = {};

        Object.assign(instance, {
            registerComponent(component) {
                components[component.id] = component;
                return this;
            },

            removeComponent(name) {
                delete components[name];
                return this;
            },

            get components() {
                return components;
            }
        });
    }

})();