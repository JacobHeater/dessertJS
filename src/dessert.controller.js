(() => {

    'use strict';

    var PropertyHelper;
    var ArrayHelper;

    define(
        [
            'helpers/property-helper',
            'helpers/array-helper'
        ],
        main
    );

    function main(
        $PropertyHelper,
        $ArrayHelper
    ) {

        PropertyHelper = $PropertyHelper;
        ArrayHelper = $ArrayHelper;

        return Controller;
    }

    class Controller {
        constructor(name, init) {

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
            }]);

            addStateMethods(this);

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

})();