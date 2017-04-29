(function() {

    'use strict';

    define(main);

    function main() {
        return setResources;
    }

    function setResources(app) {
        app.resources({
            'authenticate': './templates/authenticate.html'
        });
    }

})();
