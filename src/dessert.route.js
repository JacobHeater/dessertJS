(() => {

    'use strict';

    var RegexHelper;
    var PropertyHelper;
    var Argument;

    define(
        [
            'helpers/regex-helper',
            'helpers/property-helper',
            'dessert.argument'
        ],
        main
    );

    function main(
        $RegExHelper,
        $PropertyHelper,
        $Argument
    ) {

        RegexHelper = $RegExHelper;
        PropertyHelper = $PropertyHelper;
        Argument = $Argument;

        return Route;
    }

    class Route {
        constructor(path, controller, view, args = []) {

            PropertyHelper.addReadOnlyProperties(this, [{
                name: 'path',
                value: path
            }, {
                name: 'baseUri',
                value: args.length > 0 ? getBaseUri(path) : path
            }, {
                name: 'controller',
                value: controller
            }, {
                name: 'view',
                value: view
            }, {
                name: 'args',
                value: args
            }]);

        }

        static parsePathArgs(path) {
            return parsePathArgs(path);
        }

        argsHash(path) {
            var hash = {};
            var pathSplit = splitUrlByFwdSlash(path, false);
            var argName = '';
            if (this.args && this.args.length) {
                this.args.forEach(a => {
                    argName = a.name.replace(RegexHelper.ARG_DATA_TYPE, '');
                    PropertyHelper.addReadOnlyProperty(hash, argName, a.castToDataType(pathSplit[a.index]));
                });
            }
            return hash;
        }

        matchTemplate(path) {
            var matches = false;
            var selfPath = this.path;
            var pathBase = getBaseUri(path);
            var pathArgs = splitUrlByFwdSlash(path).slice(1);

            if (pathBase === this.baseUri && pathArgs.length === this.args.length) {
                matches = true;
            }

            return matches;
        }
    }

    function parsePathArgs(path) {
        var argsEntites = [];
        var args = path.match(RegexHelper.ARG_DEFINITION);
        var urlSplit = splitUrlByFwdSlash(path, false);

        if (args) {
            argsEntites = args.map(a => new Argument(a, removeCurlyBraces(a), urlSplit.indexOf(a), getDataType(a)));
        }

        return argsEntites;
    }

    function removeCurlyBraces(name) {
        return name.replace(RegexHelper.ARG_PLACEHOLDER, '');
    }

    function getDataType(name) {
        return removeCurlyBraces(name).split(':')[0];
    }

    function splitUrlByFwdSlash(path, removeEmpties = true) {
        var split = path.split(RegexHelper.FORWARD_SLASH);

        if (removeEmpties) {
            split = split.filter(s => s.length > 0);
        }

        return split;
    }

    function getBaseUri(path) {
        var urlSplit = splitUrlByFwdSlash(path);
        var pathBase = `/${urlSplit[0]}/`;

        return pathBase;
    }

})();