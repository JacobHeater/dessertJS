define(['./app'], function (app) {
    "use strict";
    var module = app.module('countries');
    module.controller('countriesController', function () {
        var view;
        var model;
        var module;

        this.scope = function (scope) {
            view = scope.view;
            model = scope.model;
            module = scope.module;
        };  

        this.init = function () {
            var controls = view.controls;
            var tbCountry = controls.tbCountry;
            var countryDetail = controls.countryDetail;
            var loader = controls.loader.hide();

            tbCountry.dsrt.bind(model).jq.keyup(function () {
                if (!loader.is(':visible')) {
                    loader.show();
                }
                var val = model.tbCountry;
                if (val.length > 3) {
                    $.get('https://restcountries.eu/rest/v1/name/%name'.replace('%name', val))
                        .then(function (data) {
                            data = data.map(function(row) {
                                row.getCapital = function() {
                                    return this.capital || "Unlisted";
                                };

                                row.getCurrencies = function() {
                                    return this.currencies.join(',');
                                };

                                row.getTimezones = function() {
                                    return this.timezones ? this.timezones.join(',') : "N/A";
                                };

                                row.getRegion = function() {
                                    return this.region || "Unlisted";
                                };

                                return row;
                            });
                            if (loader.is(':visible')) {
                                loader.hide();
                            }
                            countryDetail.dsrt.repeat(data, module.template('countries'), {
                                clear: true
                            });
                        }).fail(function () {
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
        };

        this.destroy = function () {

        };

    });

    app.init();
});