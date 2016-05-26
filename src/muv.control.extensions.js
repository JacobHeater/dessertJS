define(['./muv.control.repeat', './muv.common', './muv.ajax', './muv.context.init'], function(repeater, common, ajax, contextInit) {
    var attrs = common.attrs;
    var selectors = common.selectors;
    //The $ factory element result to extend with the muv object.
    return function(element) {
        element.muv.bind = function(model) {
            if (model) {
                //First init the control with the model value
                element.val(model[element.attr(attrs.control)]);
                //Then set the handler to track the changes.
                element.on('keyup keydown change', function() {
                    //TODO: Handle different types of controls such as SELECT and RadioButton
                    model[$(this).attr(attrs.control)] = ($(this).val() || $(this).text());
                });
            }
            return this;
        };
        element.muv.watch = function(watcher) {
            if (typeof watcher === 'function') {
                element.on('keyup keydown change', function() {
                    watcher.call($(this));
                });
            }
            return this;
        };
        element.muv.src = function(path) {
            return {
                path: path
            };
        };
        element.muv.load = function(path, callback) {
            var app = element.muv.view.controller.module.app;
            var muvPath = app.muvPath;
            require([
              muvPath.concat('muv.context.init'),
              muvPath.concat('muv.externalmodules.init')
            ], function(contextInit, externalInit) {
                ajax.get(path.path)
                    .then(function(data) {
                        element.children().remove();
                        element.append(data);
                        var asyncInit = externalInit(element, app);
                        asyncInit(0, function() {
                          contextInit(element, element.muv.view.controller.module.app, {}, callback);
                        });
                    });
            });
        };
        element.muv.outerHtml = function($elem) {
            var elem = $elem || element;
            var wrapped = elem.wrap('<div />');
            var html = wrapped.parent().html();
            elem.unwrap('<div />');
            return html;
        };
        element.muv.repeat = repeater(selectors, attrs, element);
    };
});
