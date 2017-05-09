/**
 * 
 */
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
    var ResourceHelper;
    var ResourceRequest;
    var Status;

    define(
        [
            'helpers/array-helper',
            'helpers/dom-helper',
            'helpers/property-helper',
            'helpers/resource-helper',
            'dessert.resourcerequest',
            'dessert.status'
        ],
        main
    );

    function main(
        $ArrayHelper,
        $DomHelper,
        $PropertyHelper,
        $ResourceHelper,
        $ResourceRequest,
        $Status
    ) {

        ArrayHelper = $ArrayHelper;
        dom = $DomHelper;
        PropertyHelper = $PropertyHelper;
        ResourceHelper = $ResourceHelper;
        ResourceRequest = $ResourceRequest;
        Status = $Status;

        return RENDERING;
    }

    function renderComponents(app, components, controller) {
        let componentsArr = getComponentsArray(components);
        let DessertElement = app.DessertElement;

        componentsArr.forEach(c => processComponents(c, components, DessertElement, app, controller));

        if (findComponents(DessertElement, componentsArr).length) {
            renderComponents(app, components, controller);
        }
    }

    function renderInnerComponents(app, components, componentFrag, component) {
        let componentsArr = getComponentsArray(components);
        let DessertElement = app.DessertElement;

        componentsArr.forEach(c => processComponents(c, components, DessertElement, app, component, componentFrag));
    }

    function getComponentsArray(components) {
        return ArrayHelper.objectValues(components);
    }

    function findComponents(DessertElement, componentsArr) {
        return componentsArr.map(c => DessertElement.findAll(c.name).length).filter(len => len > 0);
    }

    function processComponents(c, components, DessertElement, app, owner, context) {
        let domElems = owner.type === 'controller' ? DessertElement.findAll(c.name) : context.findAll(c.name);
        let state = owner.state || {};

        ArrayHelper.enumerate(domElems, elem => {
            let id = elem.attr('id');
            let isPartial = !id;
            let resources = app.resources();
            let instance = new c(resources, state, elem, id);
            let html = instance.render();
            if (html instanceof ResourceRequest) {
                let resource = ResourceHelper.requestResource(resources, html);
                if (resource !== Status.ERROR && resource !== Status.NOT_FOUND) {
                    html = resource;
                } else if (resource === Status.NOT_FOUND) {
                    html = `<span style="display: none;">resource "${html.name}" not found</span>`;
                } else if (resource === Status.ERROR) {
                    html = `<span style="display: none;">Error loading "${html.name}".</span>`;
                } else {
                    html = `<span style="display: none;">Unknown issue loading "${html.name}"</span>`;
                }
            }
            let componentFrag = DessertElement.factory(html);
            let componentElement = componentFrag.element;

            if (!isPartial) {
                renderControls(app, componentFrag, instance);
                renderInnerComponents(app, components, componentFrag, instance);
                //This is not a partial view.
                //Add it to the controller.
                owner.registerComponent(instance);
            }

            if (instance.init) {
                instance.init(componentFrag);
            }

            elem.replaceWith(componentElement);
        });
    }

    function renderControls(app, context, owner) {
        let controls = context.findAll(SELECTOR_DSRT_CTRL);
        let controlsArray = ArrayHelper.castArray(controls);
        let DessertElement = app.DessertElement;

        controlsArray.forEach(ctrl => owner.registerControl(ctrl.data(ATTR_DSRT_CTRL), new DessertElement(ctrl.element)));
    }

})();