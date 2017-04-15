(function () {

    'use strict';

    var URL_HELPER = {
        addQueryString: addQueryString,
        queryStringToHash: queryStringToHash
    };

    define(main);

    function main() {
        return URL_HELPER;
    }

    function addQueryString(string, queryHash) {
        if (string && queryHash) {
            if (!hasQueryString(string)) {
                string += '?';
            }

            string += Object.keys(queryHash).map(function (k) {
                return k + '=' + queryHash[k];
            }).reduce(function (c, n) {
                return c + '&' + n;
            });

            return string;
        }
        return string;
    }

    function queryStringToHash(string) {
        if (hasQueryString(string)) {
            var hash = {};
            var querySide = string.split('?')[1];
            var splitByPairs = querySide.split('&');
            var keyValuePairs = splitByPairs.map(function (p) {
                return p.split('=');
            });
            keyValuePairs.forEach(function (kvp) {
                return hash[kvp[0]] = kvp[1];
            });
            return hash;
        }
        return string;
    }

    function hasQueryString(string) {
        return (/\?/g.test(string)
        );
    }
})();