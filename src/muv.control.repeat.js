define(['./muv.databinding', './muv.ajax'], function(db, ajax) {
    return function(selectors, attrs, element) {
        return function(sequence, template, config) {
            var $this = this;
            var iterateSequence;
            var bindTemplate;
            var $output = [];
            var buildOutput = function(output) {
                var html = output.map(function(elem) {
                    return $('<div />').append($(elem).clone()).html();
                }).join('');
                if (_config.clear === true) {
                    element.children().remove();
                }
                element.append(html);
            };
            var _config = {
                clear: false
            };
            if (typeof config === 'function') {
                _config = config(_config) || _config;
            }
            if (sequence && sequence.length) {
                iterateSequence = function(callback) {
                    for (var i = 0; i < sequence.length; i++) {
                        callback(sequence[i]);
                    }
                };
                bindTemplate = db.bindTemplate;
                if (typeof template === 'string') {
                    iterateSequence(function(obj) {
                        $elem = bindTemplate(template, obj);
                        $output.push($elem);
                    });
                    buildOutput($output);
                } else if (typeof template === 'object') {
                    ajax.get(template.path)
                        .then(function(data) {
                            iterateSequence(function(obj) {
                                $elem = bindTemplate(data, obj);
                                $output.push($elem);
                            })
                            buildOutput($output);
                        });
                }
            }
            return this;
        }
    };
})
