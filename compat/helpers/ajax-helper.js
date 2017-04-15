(() => {

    'use strict';

    const AJAX = {
        get: get
    };
    const STATUS_OK = 200;

    var $Promise;
    var UrlHelper;

    define(['helpers/promise', 'helpers/url-helper'], main);

    function main(_Promise, $UrlHelper) {
        $Promise = _Promise;
        UrlHelper = $UrlHelper;

        return AJAX;
    }

    function get(url, options = {}) {
        return XHR(Object.assign({
            method: 'GET',
            url: url
        }, options));
    }

    function XHR(options) {
        var xhr = new XMLHttpRequest();
        var promise = new $Promise();
        var config = Object.assign({
            url: '',
            method: '',
            data: null,
            cache: false
        }, options);

        if (!config.cache) {
            config.url = UrlHelper.addQueryString(config.url, {
                noCache: Math.floor(Math.random() * 9999999999) + 1
            });
        }

        xhr.addEventListener('error', e => promise.reject(e));

        xhr.addEventListener('load', e => xhr.status === STATUS_OK ? promise.resolve(xhr.responseText) : promise.reject(xhr));

        xhr.timeout = 60000;
        xhr.open(config.method, config.url, true);

        if (config.method === 'POST') {
            xhr.send(config.data);
        } else {
            xhr.send();
        }

        return promise;
    }
})();