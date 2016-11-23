define(["../../../../bin/dessertJS/dessert.component", "jquery"], function($component, $) {
    "use strict";

    var youtube = $component.extend(function() {
        $component.call(this);

        this.render = function(done) {
            $.get("./components/youtube/embedded.html")
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
