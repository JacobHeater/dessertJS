define(["../../../../bin/dessertJS/dessert.component", "jquery"], function($component, $) {

    "use strict";

    var dropdown = $component.extend(function() {
        $component.call(this);

        this.render = function(done) {
            $
                .get("./components/dropdowns/dropdown.html")
                .success(function(data) {
                    var elem = $(data);
                    done(elem);
                });
        };

        this.constructor = function(elem) {
            elem.prop("id", ("ddwn_" + Math.random()).replace(/\./g, ""));

            this.addListItems = function(items) {
                items.forEach(function(i) {
                    elem.find(".ddwn").append("<option id='" + i.id + "'>" + i.text + "</option>");
                });
            };

            this.onItemSelected = function(handler) {
                elem.find(".ddwn").on("change", function(e) {
                    var selected = $(this).find("option:selected");
                    handler.call($(this), e, {
                        id: selected.prop("id"),
                        text: selected.text()
                    });
                });
            };

            this.getSelectedItem = function() {
                return elem.find(".ddwn").find("option:selected");
            };

            this.getSelectedValue = function() {
                return this.getSelectedItem().val();
            };
        };
    });

    return dropdown;
});