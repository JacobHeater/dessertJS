(() => {

    'use strict';

    define(
        [
            './hello-world',
            './hello-john-doe',
            './state-monitor'
        ],
        main
    );

    function main(
        HelloWorld,
        HelloJohnDoe,
        StateMonitor
    ) {
        return function register(app) {
            app.registerComponents([HelloWorld, HelloJohnDoe, StateMonitor]);
        };
    }
})();