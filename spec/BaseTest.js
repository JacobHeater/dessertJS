(() => {

    'use strict';

    const r = require('requirejs');
    const baseUrl = `${__dirname.match((/.*\/dessertJS\//))[0]}/src`;

    r.config({
        baseUrl: baseUrl
    });

    class BaseTest {
        constructor() {
            this.testCases = [];
            this.runner = null;
            this.name = '';
            this.onComplete = () => {};
            this.r = r;
        }

        assert(name, test) {
            var runner = this.runner;
            var that = this;
            this.testCases.push((tcdone) => {
                if (typeof test === 'function') {
                    test(function done(value) {
                        try {
                            console.assert(value, name);
                        } catch (e) {
                            runner.failures.push({
                                name: name,
                                error: e,
                                test: that.name
                            });
                        } finally {
                            tcdone();
                        }
                    });
                } else {
                    try {
                        console.assert(test, name);
                    } catch (e) {
                        runner.failures.push({
                            name: name,
                            error: e
                        });
                    } finally {
                        tcdone();
                    }
                }
            });
        }

        run() {
            var completed = [];
            var testCases = this.testCases;
            var that = this;

            this.testCases.forEach(t => t(
                done => {
                    completed.push(t);
                    if (completed.length === testCases.length) {
                        that.onComplete(completed);
                    }
                }
            ));
        }

        done(callback) {
            this.onComplete = callback;
        }

        setup(runner) {
            this.runner = runner;
        }
    }

    module.exports = BaseTest;
})();