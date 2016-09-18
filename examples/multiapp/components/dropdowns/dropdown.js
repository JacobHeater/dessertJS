define(["dessert.component", "dessert.ajax"], function($component, $ajax) {

    function dropdown() {

        $component.call(this);

        this.render = function(target, done) {
            $ajax
                .get("./components/dropdowns/dropdown.html")
                .success(function(data) {
                    elem = $("<div />").append(data);

                    target.append(elem);

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
        };

    }

    dropdown.prototype = Object.create($component.prototype);
    dropdown.prototype.constructor = dropdown;

    return dropdown;
});