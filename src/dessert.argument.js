(() => {

    'use strict';

    const DATA_TYPE_HELPERS = {
        'int': parseInt,
        'string': value => new String(value).valueOf(),
        'float': parseFloat,
        'bool': value => value === 'true',
        'date': value => new Date(value)
    };

    var PropertyHelper;
    var Common;

    define(
        [
            './helpers/property-helper',
            'dessert.common'
        ],
        main
    );

    function main(
        $PropertyHelper,
        $Common
    ) {

        PropertyHelper = $PropertyHelper;
        Common = $Common;

        return Argument;
    }

    class Argument {
        constructor(expression = '', name = '', index = -1, dataType = 'string') {
            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'expression',
                value: expression
            },
            {
                name: 'name',
                value: name
            }, {
                name: 'index',
                value: index
            }, {
                name: 'dataType',
                value: dataType
            }])
        }

        castToDataType(value) {
            var helper = DATA_TYPE_HELPERS[this.dataType] || (() => value);
            var parsed = helper(value);

            return Common.isInvalid(parsed) ? value : parsed;
        }
    }

})();
