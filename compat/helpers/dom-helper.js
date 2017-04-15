(function () {

    'use strict';

    var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

    define(main);

    function main() {
        return DomHelper;
    }

    var DomHelper = function () {
        function DomHelper() {
            _classCallCheck(this, DomHelper);
        }

        _createClass(DomHelper, null, [{
            key: 'createDocFrag',
            value: function createDocFrag(string) {
                return document.createRange().createContextualFragment(string);
            }
        }, {
            key: 'emptyElement',
            value: function emptyElement(element) {
                if (element && element.hasChildNodes()) {
                    while (element.lastChild) {
                        element.removeChild(element.lastChild);
                    }
                }
            }
        }]);

        return DomHelper;
    }();
})();