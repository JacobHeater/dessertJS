(() => {

    'use strict';

    var PropertyHelper;
    var ArrayHelper;
    var ResourceRequest;

    define(
        [
            'helpers/property-helper',
            'helpers/array-helper',
            'dessert.resourcerequest'
        ],
        main
    );

    function main(
        $PropertyHelper,
        $ArrayHelper,
        $ResourceRequest
    ) {

        PropertyHelper = $PropertyHelper;
        ArrayHelper = $ArrayHelper;
        ResourceRequest = $ResourceRequest;

        return Controller;
    }

    class Controller {
        constructor(app, name, init) {

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'name',
                value: name
            }, {
                name: 'init',
                value: init
            }, {
                name: 'components',
                value: {}
            }, {
                name: 'controls',
                value: {}
            }, {
                name: 'type',
                value: 'controller'
            }]);

            addStateMethods(this);
            addResourceMethods(this, app);

        }

        registerComponent(component) {
            this.components[component.id] = component;
        }

        removeComponent(component) {
            delete this.components[component.id];
        }

        registerControl(name, control) {
            this.controls[name] = control;
        }

        removeControl(name) {
            delete this.controls[name];
        }

        destroy() {
            let components = ArrayHelper.objectValues(this.components());

            components.forEach(c => c.destroy());
        }
    }

    function addStateMethods(instance) {

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'state',
            value: {}
        }]);
    }

    function addResourceMethods(instance, app) {

        PropertyHelper.addReadOnlyProperties(instance, [{
            name: 'requestResource',
            value: requestResource.bind(instance, app)
        }]);
    }

    function requestResource(app, resourceName) {
        let request = new ResourceRequest(resourceName);
        return app.requestResource(request);
    }

})();