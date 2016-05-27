﻿
define(function() {
    var attrs = {
        app: 'muv-app',
        module: 'muv-module',
        controller: 'muv-controller',
        view: 'muv-view',
        control: 'muv-control',
        model: 'muv-model',
        mask: 'muv-mask',
        src: 'muv-src',
        rpt: 'muv-repeat',
        page: 'muv-page'
    };
    var selectors = {
        app: '[$app]'.replace('$app', attrs.app),
        module: '[$module]'.replace('$module', attrs.module),
        controller: '[$controller]'.replace('$controller', attrs.controller),
        view: '[$view]'.replace('$view', attrs.view),
        control: '[$control]'.replace('$control', attrs.control),
        model: '[$model]'.replace('$model', attrs.model),
        mask: '[$mask]'.replace('$mask', attrs.mask),
        src: '[$src]'.replace('$src', attrs.src),
        rpt: '[$rpt]'.replace('$rpt', attrs.rpt),
        page: '[$page]'.replace('$page', attrs.page)
    };
    var regex = {};
    var pathTypes = {
        src: 1,
        templates: 2
    };
    var utils = {
        getOuterHtml: function($context) {
            var elem = $context;
            var wrapped = elem.wrap('<div />');
            var html = wrapped.parent().html();
            elem.unwrap('<div />');
            return html;
        }
    };
    return {
        attrs: attrs,
        selectors: selectors,
        regex: regex,
        utils:utils,
        pathTypes: pathTypes
    };
});
