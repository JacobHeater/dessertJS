(() => {

    'use strict';

    const RENDERING = {
        renderComponents: renderComponents,
        renderControls: renderControls
    };

    const ATTR_DSRT_CTRL = 'dsrtControl';
    const SELECTOR_DSRT_CTRL = '[data-dsrt-control]';

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
        let DessertElement = app.DessertElement;

        componentsArr.forEach(c => {
            let domElems = DessertElement.findAll(c.name);

            ArrayHelper.enumerate(domElems, elem => {
                let id = elem.attr('id');
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
                let componentFrag = DessertElement.factory(html);
                
                if (instance.init) {
                    instance.init(componentFrag);
                }

                if (id) {
                    //This is not a partial view.
                    //Add it to the controller.
                    controller.registerComponent(instance);
                }

                elem.replaceWith(componentFrag.element);
            });
        });

    }

    function renderControls(app, page, controller) {
        let controls = page.element.querySelectorAll(SELECTOR_DSRT_CTRL);
        let controlsArray = ArrayHelper.castArray(controls);
        let DessertElement = app.DessertElement;

        controlsArray.forEach(ctrl => controller.registerControl(ctrl.dataset[ATTR_DSRT_CTRL], new DessertElement(ctrl)));
    }

})();