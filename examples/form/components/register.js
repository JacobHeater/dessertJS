(() => {

    'use strict';

    define(
        [
            './form'
        ],
        main
    );

    function main(
        Form
    ) {

        return function register(app) {
            app.registerComponents([Form]);
        };

    }

})();