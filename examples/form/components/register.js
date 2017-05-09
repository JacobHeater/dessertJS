(() => {

    'use strict';

    define(
        [
            './authenticate',
            './repeater',
            './button'
        ],
        main
    );

    function main() {

        var components = arguments;

        return function register(app) {
            app.registerComponents(components);
        };

    }

})();