(function () {
    "use strict";

    define([
        "jquery"
    ], todoControllerModule);

    function todoControllerModule($) {
        return function addTodoControllerToModule(todoModule) {
            var controller = todoModule.controller("todoController", function () {

                var view;
                var viewData;
                var resolveToDoLists = function() {
                    this.setPlaceholder("Enter task name...");
                };
                var initView = function () {
                    view.components.todo1.resolve(resolveToDoLists);
                    view.components.todo2.resolve(resolveToDoLists);
                };

                this.scope = function ($scope) {
                    view = $scope.view;
                };

                this.isAsync = true;
                this.init = function () {
                    $.get("./json/view-data.json")
                        .then(function (data) {
                            viewData = data;
                        })
                        .fail(function () {
                            viewData = {
                                title: "Error getting view-data.json!'"
                            };
                        })
                        .always(function () {
                            this.notify();

                            initView();
                        }.bind(this));
                };

                this.initData = function () {
                    return viewData;
                };
            });

            return controller;
        };
    }

})();