(() => {

    'use strict';

    var PropertyHelper;

    define(
        [
            'helpers/property-helper'
        ],
        main
    );

    function main(
        $PropertyHelper
    ) {
        
        PropertyHelper = $PropertyHelper;

        return Resource;

    }

    class Resource {
        constructor(name, path, content) {
            
            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'name',
                value: name
            }, {
                name: 'content',
                value: content
            }, {
                name: 'path',
                value: path
            }]);

        }
    }

})();
