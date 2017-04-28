(() => {

    'use strict';

    define(main);

    function main() {

        const HELPER = {
            get FORWARD_SLASH() {
                return /\//g;
            },
            get ARG_DATA_TYPE() {
                return /[a-z]+\:/gi;
            },
            get ARG_DEFINITION() {
                return /{[a-z0-9_:]+}/gi;
            },
            get ARG_PLACEHOLDER() {
                return /{|}/g;
            }
        };


        return HELPER;

    }

})();
