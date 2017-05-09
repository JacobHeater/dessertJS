(() => {

    'use strict';

    var Const;
    var _instance;

    define(
        [
            './helpers/const'
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
                get NOT_FOUND() {
                    return Const.STATUS.NOT_FOUND;
                },
                get ERROR() {
                    return Const.STATUS.ERROR;
                }
            };
        }

        return _instance;
    }

})();