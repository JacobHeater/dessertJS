(() => {

    'use strict';

    define(main);

    function main() {
        return defineResources;
    }

    function defineResources(app) {
        app.resources({
            'hello-world': 'templates/hello-world.html',
            'hello-john-doe': 'resources/strings/strings.json'
        });
    }


})();
