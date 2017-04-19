(() => {

    'use strict';

    var ResourceRequest;

    define(
        ['dessert.resourcerequest'],
        main
    );

    function main(
        $ResourceRequest
    ) {
        ResourceRequest = $ResourceRequest;
        return PartialView;
    }

    class PartialView {

        /**
         * @static
         * @abstract
         */
        static get name() { }

        /**
         * @static
         * @param {String} name The name of the resource.
         */
        static resource(name) {
            return new ResourceRequest(name);
        }

        /**
         * @instance
         * @abstract
         */
        render() { }

    }

})();
