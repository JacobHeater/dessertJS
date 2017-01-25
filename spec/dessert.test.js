(() => {

    'use strict';

    const fs = require('fs');
    const TestRunner = require('./TestRunner.js');
    var dessertTestRunner = new TestRunner();

    fs.readdirSync('./tests').forEach(t => {
        var test = require(`./tests/${t}`);
        var instance = new test();
        dessertTestRunner.tests.push(instance);
    });

    dessertTestRunner.run();

})();