(() => {

    'use strict';

    define(
        [
            './hello-world',
            './hello-john-doe',
            './state-monitor',
            './title',
            './title-text'
        ],
        main
    );

    function main() {
        var dependencies = [].slice.call(arguments, 0);
        return app => app.registerComponents(dependencies);
    }
})();