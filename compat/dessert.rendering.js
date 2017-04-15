(() => {

    'use strict';

    const RENDERING = {
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
        let componentsArr = ArrayHelper.objectValues(components);

        componentsArr.forEach(c => {
            let domElems = document.querySelectorAll(c.name);

            ArrayHelper.enumerate(domElems, elem => {
                let instance = new c(controller.state, elem, elem.getAttribute('id'));
                let componentFrag = dom.createDocFrag(instance.render());
                instance.init(componentFrag);

                controller.registerComponent(instance);

                elem.parentNode.replaceChild(componentFrag, elem);
            });
        });
    }
})();