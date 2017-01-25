(() => {
    
    'use strict';

    class TestRunner {
        constructor() {
            this.tests = [];
            this.failures = [];
            this.onComplete = () => {};
        }

        run() {
            var runner = this;
            var completed = [];
            this.tests.forEach(t => {
                t.setup(runner);
                t.run();
                t.done(t => {
                    completed.push(t);
                    if(completed.length === runner.tests.length) {
                        runner.onComplete(completed);
                        
                        if (runner.failures.length) {
                            //There are failures. Process them and exit with code 1.
                            runner.failures.forEach(f =>  {
                                console.error(`Test Case Failure: \n\tTest Name: ${f.test} \n\tTest Case: ${f.name}`);
                                console.error(`\tError: ${JSON.stringify(f.error)}`)
                            });
                            process.exit(1);
                        }
                    }
                });
            });
        }

        done(callback) {
            this.onComplete = callback;
        }
    }

    module.exports = TestRunner;

})();