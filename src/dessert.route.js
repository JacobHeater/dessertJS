(() => {

    'use strict';

    var PropertyHelper;

    define(
        ['helpers/property-helper'],
        main
    );

    function main(
        $PropertyHelper
    ) {

        PropertyHelper = $PropertyHelper;

        return Route;
    }

    class Route {
        constructor(path, controller, view) {

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'path',
                value: path
            }, {
                name: 'controller',
                value: controller
            }, {
                name: 'view',
                value: view
            }]);

        }
    }

})();
