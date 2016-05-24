define(function() {
  return function(selectors, attrs, element) {
    return function(sequence, template, config) {
      var $this = this;
      if (sequence && sequence.length) {
          var bindTemplate = function(template) {
              var _config = {
                clear: false
              };
              if (typeof config === 'function') {
                _config = config(_config) || _config;
              }
              var regex = /\{\{[\w\d\s+()!@#$%^&*:;<>,."'\\/_-]+\}\}/gmi;
              var brackets = /\{|\}/gm;
              var fnCall = /[\w\d_]+\(/gmi;
              var rpt = []; //The built templated html
              var matches;
              var tmpl;
              var inner;
              var $tmpl;
              var $output;
              var placeholder;
              var stripped;
              var trimmed;
              var fns;
              var value;
              var replacable;
              for (var i = 0; i < sequence.length; i++) {
                  matches = template.match(regex);
                  tmpl = template;
                  $tmpl = $(tmpl);
                  inner = $tmpl.find(selectors.rpt).length > 0 ? $this.outerHtml($tmpl.find(selectors.rpt)) : tmpl;
                  for (var m = 0; m < matches.length; m++) {
                      placeholder = matches[m];
                      stripped = placeholder.replace(brackets, '');
                      trimmed = stripped.trim();
                      fns = trimmed.match(fnCall);
                      value = "";
                      if (fns === null) {
                          value = (function() {
                              return eval(trimmed);
                          }).call(sequence[i]);
                      }
                      inner = inner.replace(placeholder, value);
                  }
                  rpt.push(inner);
              }
              $output = $(rpt.join('')).map(function(i, j) {
                  return $(j).removeAttr(attrs.rpt)[0];
              });
              replacable = $tmpl.find(selectors.rpt);
              replacable.replaceWith($output);
              $output = replacable.length > 0 ? $tmpl : $output;
              if (_config.clear === true) {
                element.children().remove();
              }
              element.append($output);
          };
          if (typeof template === 'string') {
              bindTemplate(template);
          } else if (typeof template === 'object') {
              $.ajax({
                  type: 'GET',
                  cache: false,
                  async: true,
                  url: template.path
              }).then(function(data) {
                  bindTemplate(data);
              });
          }
      }
      return this;
    }
  };
})
