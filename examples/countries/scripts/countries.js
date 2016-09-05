define(['./app'], function(app) {
    var module = app.module('countries');
    module.controller('countriesController', function(view, model, module, page) {

        var controls = view.controls;
        var tbCountry = controls.tbCountry;
        var countryDetail = controls.countryDetail;
        var tbPlaceholder = controls.tbPlaceholder;
        var loader = controls.loader.hide();

        tbCountry.dsrt.bind(model).jq.keyup(function() {
            if (!loader.is(':visible')) {
              loader.show();
            }
            var val = model.tbCountry;
            if (val.length > 3) {
                $.get('https://restcountries.eu/rest/v1/name/%name'.replace('%name', val))
                    .then(function(data) {
                        if (loader.is(':visible')) {
                          loader.hide();
                        }
                        countryDetail.dsrt.repeat(data, module.template('countries'), {
                            clear: true
                        });
                    }).fail(function(xhr) {
                        console.log(xhr);
                        countryDetail.html("<h3 style='color: red;'>No results found from your query</h3>");
                        if (loader.is(':visible')) {
                          loader.hide();
                        }
                    });
            } else {
                countryDetail.children().remove();
                if (loader.is(':visible')) {
                  loader.hide();
                }
            }
        });

    });

    app.init();
});
