(() => {

    'use strict';

    var PropertyHelper;
    var ArrayHelper;

    define(['helpers/property-helper', 'helpers/array-helper'], main);

    function main($PropertyHelper, $ArrayHelper) {

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
            }]);

            this.state = {};
        }

        registerComponent(component) {
            this.components[component.id] = component;
        }

        deRegisterComponent(component) {
            delete this.components[component.id];
        }

        destroy() {
            let components = ArrayHelper.objectValues(this.components());

            components.forEach(c => c.destroy());
        }
    }
})();