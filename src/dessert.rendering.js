(() => {

    'use strict';

    const RENDERING = {
        renderComponents: renderComponents
    };

    var ArrayHelper;
    var dom;
    var PropertyHelper;
    var ResourceRequest;

    define(
        [
            'helpers/array-helper',
            'helpers/dom-helper',
            'helpers/property-helper',
            'dessert.resourcerequest'
        ], 
        main
    );

    function main(
        $ArrayHelper,
        $DomHelper,
        $PropertyHelper,
        $ResourceRequest
    ) {

        ArrayHelper = $ArrayHelper;
        dom = $DomHelper;
        PropertyHelper = $PropertyHelper;
        ResourceRequest = $ResourceRequest;

        return RENDERING;
    }

    function renderComponents(app, page, components, controller) {
        let componentsArr = ArrayHelper.objectValues(components);

        componentsArr.forEach(c => {
            let domElems = document.querySelectorAll(c.name);

            ArrayHelper.enumerate(domElems, elem => {
                let instance = new c(app, controller.state, elem, elem.getAttribute('id'));
                let html = instance.render();
                if (html instanceof ResourceRequest) {
                    let resource = app.resources()[html.name];
                    if (resource) {
                        html = resource.content;
                    } else {
                        html = `<span style="display: none;">resource not found</span>`;
                    }
                }
                let componentFrag = dom.createDocFrag(html);
                instance.init(componentFrag);

                controller.registerComponent(instance);

                elem.parentNode.replaceChild(componentFrag, elem);
            });
        });

    }

})();