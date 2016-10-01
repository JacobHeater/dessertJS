define(["dessert.ajax"], function(ajax) {
    "use strict";

    return function(app) {
        app.components.register([{
            name: "dropdown",
            entry: "./components/dropdowns/dropdown"
        }, {
            name: "youtube",
            entry: "./components/youtube/embedded"
        }, {
            name: "large-youtube",
            entry: "./components/youtube/large-embedded"
        }, {
            name: "globe",
            entry: "./components/globe/globe"
        }, {
            name: "textbox",
            entry: function() {
                this.render = function(done) {
                    ajax
                        .get("./components/inputs/textboxes/simple-textbox.html")
                        .then(function(html) {
                            var elem = $(html);
                            done(elem);
                        });
                };

                this.constructor = function(elem) {
                    this.setValue = function(val) {
                        elem.val(val);
                        return this;
                    };

                    this.getValue = function() {
                        return elem.val();
                    };
                };
            }
        }]);
    };
});