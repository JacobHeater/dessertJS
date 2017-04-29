(() => {

    'use strict';

    define(
        [
            './authenticate'
        ],
        main
    );

    function main(
        Authenticate
    ) {

        return function register(app) {
            app.registerComponents([Authenticate]);
        };

    }

})();