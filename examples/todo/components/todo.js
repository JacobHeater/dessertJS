(function () {
    "use strict";

    define([
        "../../../bin/dessertJS/dessert.component",
        "jquery"
    ], function (
        $component,
        $
    ) {
        var todoList = $component.extend(function () {
            $component.call(this);

            this.render = function (done) {
                $.get("./components/todo.html")
                    .then(function (html) {
                        $.get("./templates/list-item.html")
                            .then(function (template) {
                                var $elem = $(html);

                                $elem.template = template;

                                done($elem);
                            });
                    });
            };

            this.constructor = function ($elem) {
                var that = this;
                var tbTaskName = $elem.find(".tbTaskName");
                var btnAddItem = $elem.find(".btnAddItem");
                var listItemsContainer = $elem.find(".todo-list-items");
                var listItems = [];
                var buildListItems = function () {
                    listItemsContainer.empty();

                    listItems.forEach(function (item) {
                        var dataBoundTemplate = that.bindTemplateToData($elem.template, item);

                        listItemsContainer.append(dataBoundTemplate);

                        initListItemEventHandlers();
                    });
                };
                var initListItemEventHandlers = function () {
                    listItemsContainer.find(".todo-list-item").each(function(){
                        var listItem = $(this);
                        var closer = listItem.find(".close");
                        var check = listItem.find(".done input:checkbox");
                        var name = listItem.find(".name");

                        closer.click(function() {
                            listItem.remove();

                            var matchListItem = listItems.find(function(item) {
                                return item.text === name.text().trim();
                            });

                            if (matchListItem) {
                                var indexOf = listItems.indexOf(matchListItem);

                                listItems.splice(indexOf, 1);
                            }
                        });

                        check.click(function() {
                            if (check.is(":checked")) {
                                name.css({
                                    color: "gray",
                                    "text-decoration": "line-through"
                                });
                            } else {
                                name.css({
                                    color: "initial",
                                    "text-decoration": "none"
                                });
                            }
                        });

                        name.dblclick(function() {
                            var oldElem = $(name.html()).text('');
                            var currentName = name.text().trim();
                            var input = $("<input type='text' />");
                            name.html(input);
                            input.focus();
                            input.val(currentName);
                            input.keyup(function(e) {
                                var text = input.val().trim();
                                if (e.which === 13) {
                                    var matchElem = listItems.find(function(item) {
                                        return item.text === currentName;
                                    });

                                    if (matchElem) {
                                        matchElem.text = text;
                                        matchElem.id = text;
                                    }

                                    name.html(oldElem).text(text);
                                } else if (e.which === 27) {
                                    name.html(oldElem).text(currentName);
                                }
                            });
                            input.blur(function() {
                                name.html(oldElem).text(currentName);
                            });
                        });
                    });
                };

                tbTaskName.keyup(function (e) {
                    if (e.which === 13) { //Enter key
                        btnAddItem.click();
                    }
                });

                btnAddItem.click(function () {
                    var taskName = tbTaskName.val().trim();
                    var matchTaskName = listItems.find(function (item) {
                        return item.text === taskName;
                    });

                    if (taskName && !matchTaskName) {
                        listItems.push({
                            id: taskName,
                            text: taskName
                        });
                    }

                    tbTaskName.val("");

                    buildListItems();
                });

                this.setPlaceholder = function (text) {
                    if (text) {
                        tbTaskName.prop("placeholder", text);
                    }
                    return this;
                };

                this.destroy = function() {
                    $elem.remove();
                };
            };
        });

        return todoList;
    });
})();