(() => {

    'use strict';

    define(['dessert.partialview'], main);

    function main(PartialView) {
        class Title extends PartialView {
            static get name() {
                return 'my-title';
            }

            render() {
                return `<h3><my-title-text></my-title-text></h3>`;
            }
        }

        return Title;
    }

})();