(() => {

    'use strict';

    define(['dessert.partialview'], main);

    function main(PartialView) {
        class TitleText extends PartialView {
            static get name() { return 'my-title-text' }

            render() {
                return `<span>This is a title!</span>`;
            }
        }

        return TitleText;
    }

})();
