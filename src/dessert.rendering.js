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
                let id = elem.getAttribute('id');
                let instance = new c(app, controller.state, elem, id);
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
                
                if (instance.init) {
                    instance.init(componentFrag);
                }

                if (id) {
                    //This is not a partial view.
                    //Add it to the controller.
                    controller.registerComponent(instance);
                }

                elem.parentNode.replaceChild(componentFrag, elem);
            });
        });

    }

})();