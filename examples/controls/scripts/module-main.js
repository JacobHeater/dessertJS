define(["dessert.ajax"], function(ajax) {
    "use strict";
    return function(app) {
        app
            .module("main")
            .controller("mainCtrl", function(view) {
                var components = view.components;
                var btn = view.controls.btn;
                var btnTb = view.controls.btnTb;
                var btnDdwn = view.controls.btnDdwn;
                var btnStartGlobe = view.controls.btnStartGlobe;
                var btnStopGlobe = view.controls.btnStopGlobe;

                components.ddwn.resolve(function() {
                    components.ddwn = this;
                    ajax.get("./data/dropdown.json")
                        .then(function(data) {
                            var arr = data.data;
                            components.ddwn.addListItems(arr);
                        });
                });

                components.tb.resolve(function() {
                    components.tb = this;
                    this.setValue("Called from the controller!");
                });

                components.tb2.resolve(function() {
                    components.tb2 = this;
                    this.setValue("What? A Second textbox?!");
                });

                components.yt1.resolve(function() {
                    components.yt1 = this;
                    this.watch("k4U-TMStHyM");
                });

                components.yt2.resolve(function() {
                    components.yt2 = this;
                    this.watch("Kfpnwk-DXrA");
                });

                components.globe.resolve(function() {
                    components.globe = this;
                    this.render();
                });

                btnDdwn.click(function() {
                    alert(components.ddwn.getSelectedValue());
                });
                btnTb.click(function() {
                    alert(components.tb.getValue());
                });
                btn.click(function() {
                    alert(components.tb2.getValue());
                });
                btnStartGlobe.click(function() {
                    components.globe.animate();
                });

                btnStopGlobe.click(function() {
                    components.globe.stop();
                });
            });
    };
});