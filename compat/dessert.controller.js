(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var PropertyHelper;
    var ArrayHelper;

    define(['helpers/property-helper', 'helpers/array-helper'], main);

    function main($PropertyHelper, $ArrayHelper) {

        PropertyHelper = $PropertyHelper;
        ArrayHelper = $ArrayHelper;

        return Controller;
    }

    var Controller = function () {
        function Controller(name, init) {
            _classCallCheck(this, Controller);

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

        _createClass(Controller, [{
            key: 'registerComponent',
            value: function registerComponent(component) {
                this.components[component.id] = component;
            }
        }, {
            key: 'deRegisterComponent',
            value: function deRegisterComponent(component) {
                delete this.components[component.id];
            }
        }, {
            key: 'destroy',
            value: function destroy() {
                var components = ArrayHelper.objectValues(this.components());

                components.forEach(function (c) {
                    return c.destroy();
                });
            }
        }]);

        return Controller;
    }();
})();