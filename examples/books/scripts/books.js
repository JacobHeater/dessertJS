define(['./app', "jquery"], function (app, $) {
    "use strict";
    app.module('booksearch').controller('booksearchController', function () {
        var view;
        var page;
        var model;
        var module;

        this.scope = function (scope) {
            view = scope.view;
            page = scope.page;
            model = scope.model;
            module = scope.module;
        };

        this.init = function () {
            var controls = view.controls;
            var tbAuthorName = controls.tbAuthorName;
            var btnSearch = controls.btnSearch;
            var displayBooks = controls.displayBooks;
            var loader = controls.loader.hide();
            var getBookDetail = function () {
                loader.show();
                var url = 'https://www.googleapis.com/books/v1/volumes?q=author:$author'.replace("$author", model.tbAuthorName.trim());
                $.get(encodeURI(url))
                    .then(function (data) {
                        data.items = data.items.map(function (item) {
                            if (item.volumeInfo && item.volumeInfo.industryIdentifiers) {
                                var isbn10 = item.volumeInfo.industryIdentifiers.filter(function (id) {
                                    return id.type === "ISBN_10";
                                })[0];
                                var isbn13 = item.volumeInfo.industryIdentifiers.filter(function (id) {
                                    return id.type === "ISBN_13";
                                })[0];

                                item.isbn = (isbn10 || isbn13).identifier;
                            } else {
                                item.isbn = "Unspecified";
                            }

                            item.searchTerm = model.tbAuthorName.trim();

                            item.description = item.volumeInfo.description || "No description provided...";

                            return item;
                        });

                        displayBooks.dsrt.repeat(data.items, module.template('books-simple'), {
                            clear: true
                        });
                    })
                    .then(function () {
                        loader.hide();
                    });
            };
            if (page.args.length > 0) {
                var authorName = page.args.filter(function (arg) {
                    return arg.key === 'authorName';
                }).map(function (arg) {
                    return arg.value;
                })[0];
                if (authorName) {
                    model.tbAuthorName = authorName;
                    getBookDetail();
                }
            }
            tbAuthorName.dsrt.bind(model).jq.keyup(function (e) {
                if (e.which === 13) {
                    btnSearch.click();
                }
            });
            btnSearch.click(function () {
                if (model.tbAuthorName.trim()) {
                    page.route('/booksearch', [{
                        key: 'authorName',
                        value: model.tbAuthorName.trim()
                    }]);
                    getBookDetail();
                }
            });
        };

        this.destroy = function () {

        };
    });
    app.module('bookdetails').controller('bookDetailsController', function () {
        var view;
        var module;
        var page;

        this.scope = function (scope) {
            view = scope.view;
            module = scope.module;
            page = scope.page;
        };

        this.init = function () {
            var controls = view.controls;
            var loader = controls.loader;
            var displayBooks = controls.displayBooks;
            var isbn = page.args.filter(function (arg) {
                return arg.key === 'isbn';
            }).map(function (arg) {
                return arg.value;
            })[0];
            var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:$isbn'.replace("$isbn", isbn);
            loader.show();
            $.get(encodeURI(url))
                .then(function (data) {
                    loader.hide();

                    data.items = data.items.map(function (row) {
                        row.description = row.volumeInfo.description || "No description provided...";
                        row.averageRating = row.volumeInfo.averageRating || "N/A";
                        row.authors = row.volumeInfo.authors ? row.volumeInfo.authors.join(', ').replace(/, $/, '') : "Unspecified";
                        row.categories = row.volumeInfo.categories ? row.volumeInfo.categories.join(', ').replace(/, $/, '') : "Unspecified";

                        return row;
                    });

                    displayBooks.dsrt.repeat(data.items, module.template('books-detailed'), {
                        clear: true
                    });
                });
        };

        this.destroy = function () {

        };
    });

    app.init();
});