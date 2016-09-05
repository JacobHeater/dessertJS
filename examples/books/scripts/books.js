define(['./app'], function(app) {
    app.module('booksearch').controller('booksearchController', function(view, model, module, page) {
        var controls = view.controls;
        var tbAuthorName = controls.tbAuthorName;
        var btnSearch = controls.btnSearch;
        var displayBooks = controls.displayBooks;
        var loader = controls.loader.hide();
        var getBookDetail = function() {
            loader.show();
            var url = 'https://www.googleapis.com/books/v1/volumes?q=author:$author'.replace("$author", model.tbAuthorName.trim());
            $.get(encodeURI(url))
                .then(function(data) {
                    loader.hide();
                    displayBooks.dsrt.repeat(data.items.map(function(item) {
                        item.searchTerm = model.tbAuthorName.trim();
                        return item;
                    }), module.template('books-simple'), {
                        clear: true
                    });
                });
        };
        if (page.args.length > 0) {
            var authorName = page.args.filter(function(arg) {
                return arg.key === 'authorName';
            }).map(function(arg) {
                return arg.value;
            })[0];
            if (authorName) {
                model.tbAuthorName = authorName;
                getBookDetail();
            }
        }
        tbAuthorName.dsrt.bind(model).jq.keyup(function(e) {
            if (e.which === 13) {
                btnSearch.click();
            }
        });
        btnSearch.click(function() {
            if (model.tbAuthorName.trim()) {
              page.route('/booksearch', [{
                  key: 'authorName',
                  value: model.tbAuthorName.trim()
              }]);
              getBookDetail();
            }
        });
    });
    app.module('bookdetails').controller('bookDetailsController', function(view, model, module, page) {
        var controls = view.controls;
        var loader = controls.loader;
        var displayBooks = controls.displayBooks;
        var isbn = page.args.filter(function(arg) {
            return arg.key === 'isbn';
        }).map(function(arg) {
            return arg.value;
        })[0];
        var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:$isbn'.replace("$isbn", isbn);
        loader.show();
        $.get(encodeURI(url))
            .then(function(data) {
                loader.hide();
                displayBooks.dsrt.repeat(data.items, module.template('books-detailed'), {
                    clear: true
                });
            });
    });
});
