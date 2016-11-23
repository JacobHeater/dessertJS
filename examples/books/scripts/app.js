define([
  '../../../bin/dessertJS/dessert.core',
  '../../../bin/dessertJS/dessert.interfaces',
  "jquery",
  "handlebars"
], function(dessert, interfaces, $, handlebars) {
  "use strict";
  return dessert
    .app('books', function() {
      this.src = "./views/";
      this.templates = "./templates/";
      this.providers.jquery = $;
      this.providers.IDataBindingProvider = new interfaces.IDataBindingProvider({
        bindTemplateToData: function(template, data) {
          var compiledTemplate = handlebars.compile(template);
          return compiledTemplate(data);
        }
      });
    });
});