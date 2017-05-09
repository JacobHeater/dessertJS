(() => {

    'use strict';

    var _instance;

    define(main);

    function main() {

        return getInstance();

    }

    function getInstance() {
        if (!_instance) {
            _instance = {
                STATUS: {
                    get NOT_FOUND() {
                        return 404;
                    },
                    get ERROR() {
                        return 500;
                    }
                }
            };
        }

        return _instance;
    }

})();