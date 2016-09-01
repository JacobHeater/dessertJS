/**************
@file A series of tests for testing the muv.databinding module capabilities.
@since 06/08/2016
@author Jacob Heater
***************/
(() => {
    var jasmine = require('jasmine');
    var requirejs = require('requirejs');
    describe('Test Spec', function() {
        beforeEach(function() {
            jasmine.Ajax.install();
        });
        afterEach(function() {
            jasmine.Ajax.uninstall();
        });
        it("Test", function() {
            var done = jasmine.createSpy("success");
            requirejs(['./src/muv.databinding'], function(db) {
                console.log(db);
                done();
            });
        });
    });
})();
