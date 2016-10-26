define(function() {

  "use strict";

  var BASE_PATH = "../../../lib/";

  require.config({
    paths: {
      jquery: BASE_PATH + "jquery/jquery",
      handlebars: BASE_PATH + "handlebars/handlebars"
    }
  });
  require([
    './scripts/books'
  ]);
});