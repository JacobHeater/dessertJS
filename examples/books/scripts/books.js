define(['./app'], function(app) {
    var module = app.module('booksearch');
    module.controller('booksearchController', function(view, model, module) {
        var controls = view.controls;
        var tbAuthorName = controls.tbAuthorName;
        var btnSearch = controls.btnSearch;
        var displayBooks = controls.displayBooks;
        var loader = controls.loader.hide();
        tbAuthorName.muv.bind(model).jq.keyup(function(e){
          if (e.which === 13) {
            btnSearch.click();
          }
        });
        btnSearch.click(function() {
            if (tbAuthorName.val().trim()) {
                loader.show();
                var url = 'https://www.googleapis.com/books/v1/volumes?q=author:$author'.replace("$author", tbAuthorName.val().trim());
                $.get(encodeURI(url))
                    .then(function(data) {
                        loader.hide();
                        displayBooks.muv.repeat(data.items.map(function(item) {
                            item.searchTerm = tbAuthorName.val().trim();
                            return item;
                        }), module.template('books'), {
                            clear: true
                        });
                    });
            }
        });
    });
    return module;
});
