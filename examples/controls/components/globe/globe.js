define(["../../../../bin/dessertJS/dessert.component", "jquery"], function($component, $) {
    "use strict";

    var globe = $component.extend(function() {
        $component.call(this);

        this.render = function(done) {
            $.get("./components/globe/globe.html")
                .done(function(html) {
                    var elem = $(html);
                    done(elem);
                });
        };

        this.constructor = function(elem) {
            var animating = false;
            var earth;
            var before;
            elem.prop("id", "" + Math.random() + "".replace(/[\.]+/g, ""));
            this.render = function() {
                earth = new WE.map(elem[0], {
                    zoom: 2.0,
                    sky: true,
                    atmosphere: true
                });

                WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(earth);
            };

            this.animate = function() {
                animating = true;
                requestAnimationFrame(function animate(now) {
                    var c = earth.getPosition();
                    var elapsed = before ? now - before : 0;
                    before = now;
                    earth.setCenter([c[0], c[1] + 0.1 * (elapsed / 30)]);
                    if (animating) {
                        requestAnimationFrame(animate);
                    }
                });
            };

            this.stop = function() {
                animating = false;
            };
        };
    });

    return globe;
});