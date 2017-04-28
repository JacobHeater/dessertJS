/**
 * @file A helper for creating and modifying URLs in dessertJS
 * @author Jacob Heater
 * @since 04/15/2017
 */
(() => {

    'use strict';

    const URL_HELPER = {
        addQueryString: addQueryString,
        queryStringToHash: queryStringToHash
    };

    define(main);

    /**
     * Main entry point for the UrlHelper module.
     * 
     * @returns {Object} The URL helper object.
     */
    function main() {
        return URL_HELPER;
    }

    function addQueryString(string, queryHash) {
        if (string && queryHash) {
            if (!hasQueryString(string)) {
                string += '?';
            }

            string += Object
                .keys(queryHash)
                .map(k => `${k}=${queryHash[k]}`)
                .reduce((c, n) => `${c}&${n}`);

            return string;
        } 
        return string;
    }

    function queryStringToHash(string) {
        if (hasQueryString(string)) {
            var hash = {};
            var querySide = string.split('?')[1];
            var splitByPairs = querySide.split('&');
            var keyValuePairs = splitByPairs.map(p => p.split('='));
            keyValuePairs.forEach(kvp => hash[kvp[0]] = kvp[1]);
            return hash;
        }
        return string;
    }

    function hasQueryString(string) {
        return /\?/g.test(string);
    }

})();