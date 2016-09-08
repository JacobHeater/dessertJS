define(function() {
    "use strict";
    return function(model, view, controller) {
        /*
        This module is responsible for setting up the autoSaveTextbox.html module.
        We can use this from our controller to set up the view with a set of events
        that we can use to implement our controller logic, instead of writing all of the logic
        in the controller.

        This is benefical when we want to share a module with someone, and they don't
        want to implement the controller the same way you did, but they'd rather use your control events to
        implement their controller logic.
        */
        var controls = view.controls;
        var _nameVal = "";
        var _ageVal = "";
        var name;
        var age;
        var tbs;
        var edit;
        var current;
        var pending;
        //Set up all of the events that we want available in the view
        view.configureEvents(['doneEditing', 'nameChanged', 'ageChanged']);
        var disableFields = function() {
            name.prop('disabled', true);
            age.prop('disabled', true);
            //Check for the view.doneEditing listener
            view.doneEditing.trigger(name, age);
        };
        $(document).click(function(e) {
            if (!$.contains(controls.wrapper[0], e.target) && !name.prop('disabled') && !age.prop('diabled')) {
                disableFields();
            }
        });
        view.controls.clear.click(function() {
            view.controls.console.html('<i style="color: rgb(200, 200, 200);" class="msg-cleared">console cleared</i>');
            setTimeout(function() {
                view.controls.console.find('.msg-cleared').fadeOut();
            }, 1000);
        });
        view.controls.console.log = function(content) {
            current = $(this).html();
            pending = "<br />$content".replace("$content", content);
            $(this).html(current.concat(pending));
        };
        name = controls.name.prop('disabled', true).focus(function() {
            _nameVal = $(this).val();
        }).blur(function() {
            if ($(this).val() !== _nameVal) {
                view.nameChanged.trigger(_nameVal, $(this).val());
                _nameVal = $(this).val();
            }
        }).dsrt.bind(model).jq;
        age = controls.age.prop('disabled', true).focus(function() {
            _ageVal = $(this).val();
        }).blur(function() {
            if ($(this).val() !== _ageVal) {
                view.ageChanged.trigger(_ageVal, $(this).val());
                _ageVal = $(this).val();
            }
        }).dsrt.bind(model).jq;
        tbs = $([name, age].map(function(j) {
            return j[0];
        })).keyup(function(e) {
            if (e.which === 27) {
                disableFields();
            }
        });
        edit = controls.edit.click(function() {
            name.prop('disabled', false).focus();
            age.prop('disabled', false);
        });
    };
});