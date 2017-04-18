(() => {

    'use strict';

    var ajax;
    var $Promise;
    var Resource;

    define(
        [
            'helpers/ajax-helper',
            'helpers/promise',
            'dessert.resource',
        ],
        main
    );


    function main(
        $ajax,
        $$Promise,
        $Resource
    ) {

        ajax = $ajax;
        $Promise = $$Promise;
        Resource = $Resource;

        return {
            loadResources: loadResources
        };

    }

    function loadResources(res) {
        var prom = new $Promise();

        var resKeys = Object.keys(res);
        var idx = 0;
        var path = '';
        var name = '';
        var loadResource = function (i) {
            if (i < resKeys.length) {
                name = resKeys[i];
                path = res[name];
                if (path instanceof Resource) {
                    setTimeout(() => {
                        i++;
                        loadResource(i);
                    }, 0);
                } else {
                    ajax.get(path).then(function (content) {
                        res[name] = new Resource(name, path, content);
                        i++;
                        loadResource(i);
                    });
                }
            } else {
                prom.resolve();
            }
        };

        loadResource(idx);

        return prom;
    }

})();