(function() {

    'use strict';

    var handlebars;
    var Component;
    var _Repeater;

    define(
        [
            'handlebars',
            'dessert.component'
        ],
        main
    );

    function main(
        $handlebars,
        $Component
    ) {
        handlebars = $handlebars;
        Component = $Component;

        return createRepeater();
    }

    function createRepeater() {
        if (!_Repeater) {
            class Repeater extends Component {
                constructor() {
                    super(...arguments);
                }

                static get name() {
                    return 'repeater';
                }

                render() {
                    return `<div class="repeater-container"></div>`;
                }

                api(element) {
                    super.api(element);

                    var elemCreated = this.describe('template element is created');

                    this.repeat = function repeat(template, data) {
                        var _template = handlebars.compile(template);
                        var _element;
                        data.forEach(d => {
                            _element = Component.createElement(_template(d));
                            elemCreated.fire([_element]);
                            element.append(_element);
                        });
                    };
                }

                init(element) {
                    super.init(element);
                }
            }
            _Repeater = Repeater;
        }

        return _Repeater;
    }

})();