(() => {

    'use strict';

    var Const;
    var _instance;

    define(
        [
            './const'
        ],
        main
    );

    function main(
        $Const
    ) {

        Const = $Const;

        return getInstance();

    }

    function getInstance() {

        if (!_instance) {
            _instance = {
                requestResource: requestResource
            };
        }

        return _instance;

    }

    function requestResource(resources, resourceRequest) {
        if (resources && resourceRequest && resourceRequest.name) {
            let resourceName = resourceRequest.name;
            let match = resources[resourceName];

            if (match) {
                return match.content;
            } else {
                return Const.STATUS.NOT_FOUND;
            }
        } else {
            return Const.STATUS.ERROR;
        }
    }

})();