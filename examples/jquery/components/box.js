(function() {

    'use strict';

    define([
        'dessert.component'
    ], main);

    function main(
        Component
    ) {

        class Box extends Component {

            static get name() { return 'box'; }

            render() {
                return `<div class="box"></div>`;
            }

            init(wrapper) {
                var box = wrapper.element;
                var expanding = false;
                var dimensions = 100;

                box.click(function() {
                    if (expanding) {
                        box.stop().animate({
                            width: '50px',
                            height: '50px'
                        });
                        expanding = false;
                    } else {
                        dimensions = prompt('What width and height would you like to expand to?', '100');
                        dimensions = dimensions.replace(/[a-z]+$/gi, ''); //remove any trailing units (px, em, etc)
                        dimensions = parseInt(dimensions) || 100;
                        dimensions = `${dimensions}px`;
                        box.stop().animate({
                            width: dimensions,
                            height: dimensions
                        });
                        expanding = true;
                    }
                });
            }
        }

        return Box;

    }
})();
