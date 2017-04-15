(function () {

    'use strict';

    var RENDERING = {
        renderComponents: renderComponents
    };

    var ArrayHelper;
    var dom;
    var PropertyHelper;

    define(['helpers/array-helper', 'helpers/dom-helper', 'helpers/property-helper'], main);

    function main($ArrayHelper, $DomHelper, $PropertyHelper) {

        ArrayHelper = $ArrayHelper;
        dom = $DomHelper;
        PropertyHelper = $PropertyHelper;

        return RENDERING;
    }

    function renderComponents(page, components, controller) {
        var componentsArr = ArrayHelper.objectValues(components);

        componentsArr.forEach(function (c) {
            var domElems = document.querySelectorAll(c.name);

            ArrayHelper.enumerate(domElems, function (elem) {
                var instance = new c(controller.state, elem, elem.getAttribute('id'));
                var componentFrag = dom.createDocFrag(instance.render());
                instance.init(componentFrag);

                controller.registerComponent(instance);

                elem.parentNode.replaceChild(componentFrag, elem);
            });
        });
    }
})();