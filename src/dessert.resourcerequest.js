(() => {

    'use strict';

    define(main);

    function main() {
        return ResourceRequest;
    }

    class ResourceRequest {
        constructor(name) {
            
            Object.assign(this, {
                get name() {
                    return name;
                }
            });

        }
    }

})();
