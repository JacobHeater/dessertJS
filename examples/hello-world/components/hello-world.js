(() => {


    'use strict';

    define(['dessert.component'], main);

    function main(
        Component
    ) {
        
        class HelloWorld extends Component {
            static get name() {
                return 'hello-world';
            }

            render() {
                return Component.resource('hello-world');
            }

            api(element) {
                var tb = element.find('.hello-world-tb').element;

                Object.assign(this, {
                    setText(text) {
                        tb.value = text || tb.value;
                    }
                });
            }

            init(element) {
                super.init(element);

                var tb = element.find('.hello-world-tb').element;
                var btn = element.find('.btn-say-hello').element;
                var output = element.find('.output').element;
                var that = this;

                this.describe('user clicks say hello', behavior => {
                    btn.addEventListener('click', () => {
                        var val = tb.value;
                        that.state.salutation = val;
                        behavior.fire([val]);
                    });
                });

                this.describe('user bind keystrokes', () => {
                    tb.addEventListener('keyup', () => {
                        output.textContent = tb.value;
                        that.state.msg = tb.value;
                    });
                });
            }
        }

        return HelloWorld;
    }


})();