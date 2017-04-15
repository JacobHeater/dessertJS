(() => {

    'use strict';

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

    class Behavior {
        constructor(name, action) {

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
        }
    }

    function addBehaviorMethods(instance, listeners) {
        instance.addListener = callback => {
            if (TypeHelper.isFunction(callback)) {
                let listenerId = uuid();
                listeners.push({
                    fn: callback,
                    id: listenerId
                });
            }
        };

        instance.removeListener = id => ArrayHelper.remove(listeners, l => l.id === id);

        instance.fire = function fire(args) {
            let fn = l => l.fn(...args);
            listeners.forEach(fn);
        };
    }
})();