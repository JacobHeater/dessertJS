(function() {

    'use strict';

    define(
        [
            './box'
        ],
        main
    );

    function main(
        Box
    ) {

        return function registerComponents(app) {
            app.registerComponents([
                Box
            ]);
        };

    }

})();
