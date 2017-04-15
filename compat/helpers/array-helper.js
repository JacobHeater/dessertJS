(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    define(main);

    function main() {
        return ArrayHelper;
    }

    var ArrayHelper = function () {
        function ArrayHelper() {
            _classCallCheck(this, ArrayHelper);
        }

        _createClass(ArrayHelper, null, [{
            key: 'objectValues',
            value: function objectValues(obj) {
                return Object.keys(obj).map(function (k) {
                    return obj[k];
                });
            }
        }, {
            key: 'enumerate',
            value: function enumerate(enumerable, callback) {
                if (Array.isArray(enumerable) || 'length' in enumerable) {
                    for (var i = 0; i < enumerable.length; i++) {
                        callback(enumerable[i], i);
                    }
                }
            }
        }, {
            key: 'remove',
            value: function remove(enumerable, callback) {
                if (Array.isArray(enumerable)) {
                    var match = enumerable.find(callback);
                    var idx = enumerable.indexOf(match);
                    enumerable.splice(idx, 1);
                }
            }
        }]);

        return ArrayHelper;
    }();
})();