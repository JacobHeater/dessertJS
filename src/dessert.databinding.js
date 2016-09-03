define(['./dessert.common', "jquery"], function(common, $) {
    "use strict";
    var selectors = common.selectors;
    var attrs = common.attrs;
    var datadsrtExtensions = {
        getMarkup: function(tag, attrs) {
            var elem = $(tag);
            if (attrs && attrs.length && attrs.splice) {
                attrs.forEach(function(attr) {
                    var split = attr.split('|').map(function(str) {
                        return str.trim();
                    });
                    var key = split[0];
                    var value = split[1];
                    elem.attr(key, value);
                });
            } else if (attrs) {
                elem.attr(attrs);
            }
            return elem.wrap('<div />').parent().html();
        }
    };
    return {
        bindTemplate: function(template, data) {
            //var regex = /((\{\{[\w\d\s+()!@#$%^&*:;,.?"<>'\\\|\{\}_-]+\}\})|(\{\{[\w\d\s+()!@#$%^&*:;<>,.?"'\\/\|\{\}_-].*\}\}))/gmi;
            var bindingRegex = /((<dsrtCode>[\s]+[\w\d.=;?:,()"'\s/$|\\!\[\]<>\{\}+#]+[\s]+<\/dsrtCode>)|(\{\{[\s]+[\w\d.=;?:,()"'\s/$|\\!\[\]<>+#]+[\s]+\}\}))/gmi;
            var brackets = /((^{\{|\}\}$)|(^<dsrtCode>|<\/dsrtCode>$))/gmi;
            var fnCall = /^[\w\d_]+\(/gmi;
            var allowed = /for|while|do/gmi;
            var rpt = "";
            var matches = template.match(bindingRegex);
            var tmpl = template;
            var $tmpl = $(tmpl);
            var inner = $tmpl.find(selectors.rpt).length > 0 ? common.utils.getOuterHtml($tmpl.find(selectors.rpt)) : tmpl;
            var $output;
            var placeholder;
            var stripped;
            var trimmed;
            var fns;
            var value;
            var replaceable;
            for (var m = 0; m < matches.length; m++) {
                placeholder = matches[m];
                stripped = placeholder.replace(brackets, '');
                trimmed = stripped.trim();
                fns = trimmed.match(fnCall);
                value = "";
                if (allowed.test(trimmed) || fns === null) {
                    data.dsrt = datadsrtExtensions;
                    value = (function() {
                        return eval(trimmed);
                    }).call(data);
                }
                inner = inner.replace(placeholder, value);
            }
            $output = $(inner).removeAttr(attrs.rpt)[0];
            replaceable = $tmpl.find(selectors.rpt);
            replaceable.replaceWith($output);
            $output = replaceable.length > 0 ? $tmpl : $output;
            return $output;
        }
    };
})
