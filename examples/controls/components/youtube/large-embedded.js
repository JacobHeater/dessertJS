define(["jquery", "./embedded"], function($, youtube) {
    "use strict";

    var largeYoutube = youtube.extend(function() {
        youtube.call(this);

        this.render = function(done) {
            $.get("./components/youtube/large-embedded.html")
            .then(function(html) {
                var elem = $(html);
                done(elem);
            });
        };
    });

    return largeYoutube;
});
