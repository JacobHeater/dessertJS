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
            app.registerComponent(HelloWorld);
            app.registerComponent(HelloJohnDoe);
            app.registerComponent(StateMonitor);
        };
    }
})();