(() => {

    'use strict';

    define(main);

    function main() {
        return uuid;
    }

    /**
     * Generates RFC4122 compliant UUIDs.
     * 
     * Credit: https://gist.github.com/jcxplorer/823878
     * 
     * @returns {String} The generated UUID.
     */
    function uuid() {
        var uuid = "",
            i,
            random;
        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;

            if (i == 8 || i == 12 || i == 16 || i == 20) {
                uuid += "-";
            }
            uuid += (i == 12 ? 4 : i == 16 ? random & 3 | 8 : random).toString(16);
        }
        return uuid;
    }
})();