define(["../../../bin/dessertJS/dessert.customtag"], function(customTag) {
    "use strict";

    return function(app) {
        app.registerTags([
            customTag.create({
                name: "textbox",
                renderAs: customTag.types.component,
                renderAsValue: "textbox",
                tag: "textbox"
            }),
            customTag.create({
                name: "helloworld",
                renderAs: customTag.types.externalModule,
                renderAsValue: "helloworld",
                tag: "helloWorld"
            }),
            customTag.create({
                name: "globe",
                renderAs: customTag.types.component,
                renderAsValue: "globe",
                tag: "globe"
            }),
            customTag.create({
                name: "youtube",
                renderAs: customTag.types.component,
                renderAsValue: "youtube",
                tag: "youtube"
            }),
            customTag.create({
                name: "buttonCtrl",
                renderAs: customTag.types.control,
                tag: "buttonCtrl",
                replaceWith: '<input type="button" />'
            }),
            customTag.create({
                name: "bigYoutube",
                renderAs: customTag.types.component,
                tag: "bigYoutube",
                renderAsValue: "large-youtube"
            }),
            customTag.create({
                name: "dropdownList",
                renderAs: customTag.types.component,
                tag: "dropdownList",
                renderAsValue: "dropdown"
            })
        ]);
    };
});