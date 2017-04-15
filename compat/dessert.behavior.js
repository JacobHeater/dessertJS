(function () {

    'use strict';

    function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    var PropertyHelper;
    var TypeHelper;
    var uuid;
    var ArrayHelper;

    define(['helpers/property-helper', 'helpers/type-helper', 'helpers/uuid', 'helpers/array-helper'], main);

    function main($PropertyHelper, $TypeHelper, $uuid, $ArrayHelper) {

        PropertyHelper = $PropertyHelper;
        TypeHelper = $TypeHelper;
        uuid = $uuid;
        ArrayHelper = $ArrayHelper;

        return Behavior;
    }

    var Behavior = function Behavior(name, action) {
        _classCallCheck(this, Behavior);

        var _listeners = [];

        PropertyHelper.addReadOnlyProperties(this, [{
            name: 'name',
            value: name
        }, {
            name: 'listeners',
            value: _listeners
        }]);

        addBehaviorMethods(this, _listeners);

        if (TypeHelper.isFunction(action)) {
            action(this);
        }
    };

    function addBehaviorMethods(instance, listeners) {
        instance.addListener = function (callback) {
            if (TypeHelper.isFunction(callback)) {
                var listenerId = uuid();
                listeners.push({
                    fn: callback,
                    id: listenerId
                });
            }
        };

        instance.removeListener = function (id) {
            return ArrayHelper.remove(listeners, function (l) {
                return l.id === id;
            });
        };

        instance.fire = function fire(args) {
            var fn = function fn(l) {
                return l.fn.apply(l, _toConsumableArray(args));
            };
            listeners.forEach(fn);
        };
    }
})();