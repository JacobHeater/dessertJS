(function () {

    'use strict';

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var PropertyHelper;

    define(['helpers/property-helper'], main);

    function main($PropertyHelper) {

        PropertyHelper = $PropertyHelper;

        return Route;
    }

    var Route = function Route(path, controller, view) {
        _classCallCheck(this, Route);

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
    };
})();