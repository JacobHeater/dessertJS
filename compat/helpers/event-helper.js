(() => {

    'use strict';

    const EVENT_HELPER = {
        initHashChange: initHashChange
    };

    define(main);

    function main() {
        return EVENT_HELPER;
    }

    function initHashChange(callback) {
        window.addEventListener('hashchange', callback);
    }
})();