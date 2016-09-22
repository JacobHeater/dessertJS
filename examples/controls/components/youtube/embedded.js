define(["dessert.component", "dessert.ajax"], function($component, $ajax) {
    "use strict";

    var youtube = $component.inherit(function() {
        $component.call(this);

        this.render = function(done) {
            $ajax.get("./components/youtube/embedded.html")
            .then(function(html) {
                var elem = $(html);
                done(elem);
            });
        };

        this.constructor = function(elem) {
            this.watch = function(videoId) {
                var baseUrl = "https://www.youtube.com/embed/$video";
                var formatted = baseUrl.replace("$video", videoId);
                elem.prop("src", formatted);
                return this;
            };
        };
    });

    return youtube;
});
