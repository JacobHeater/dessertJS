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
                return `<input type="text" class="hello-world-tb" placeholder="Enter a message" />
                        <input type="button" class="btn-say-hello" value="Say Hello!" />
                        <div class="output"></div>`;
            }

            init(element) {
                var tb = element.querySelector('.hello-world-tb');
                var btn = element.querySelector('.btn-say-hello');
                var output = element.querySelector('.output');
                var that = this;

                this.describe('user clicks say hello', function(behavior) {
                    btn.addEventListener('click', () => {
                        var val = tb.value;
                        that.state.salutation = val;
                        behavior.fire([val]);
                    });
                });

                this.describe('user bind keystrokes', () => {
                    tb.addEventListener('keyup', () => output.textContent = that.state.stuff = tb.value);
                });
            }
        }

        return HelloWorld;
    }


})();