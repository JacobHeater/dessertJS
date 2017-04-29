(() => {

    'use strict';

    define(main);

    function main() {
        return {
            get NOT_FOUND() {
                return 404;
            }
        };
    }

})();