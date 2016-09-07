/**
 * @file Exposes functionality for data binding in the dessertJS framework.
 * @author Jacob Heater
 */
define("dessert.databinding", ['dessert.common', "jquery"], function(common, $) {
    
    "use strict";
    
    var selectors = common.selectors;
    var attrs = common.attrs;
    var dataDsrtExtensions = {
        /**
         * Returns an HTML string with the rendered markup using the provided tag
         * and the attrs array to describe the attributes of the DOM element.
         * 
         * @param {String} tag The tag name of the DOM element to render markup for.
         * @param {Object[]} attrs An array of key value pairs that desribe the DOM element.
         * @returns {String} The HTML element string rendered after attributes 
         * have been added to the object.
         */
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
        /**
         * Binds the given template to the data set. The template
         * will be interrogated to pull out key information for data
         * binding to ensure that it can be bound to the data.
         * 
         * @param {String} template The HTML template to bind the data to.
         * @param {any} data The data to bind to the template.
         * @returns {String} The bound HTML template after being rendered.
         */
        bindTemplate: function(template, data) {
            //var regex = /((\{\{[\w\d\s+()!@#$%^&*:;,.?"<>'\\\|\{\}_-]+\}\})|(\{\{[\w\d\s+()!@#$%^&*:;<>,.?"'\\/\|\{\}_-].*\}\}))/gmi;
            var bindingRegex = /((<dsrtCode>[\s]+[\w\d.=;?:,()"'\s/$|\\!\[\]<>\{\}+#]+[\s]+<\/dsrtCode>)|(\{\{[\s]+[\w\d.=;?:,()"'\s/$|\\!\[\]<>+#]+[\s]+\}\}))/gmi;
            var brackets = /((^{\{|\}\}$)|(^<dsrtCode>|<\/dsrtCode>$))/gmi;
            var fnCall = /^[\w\d_]+\(/gmi;
            var allowed = /for|while|do/gmi;
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
                    data.dsrt = dataDsrtExtensions;
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
