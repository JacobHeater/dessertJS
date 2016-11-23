(function () {
    "use strict";
    define(["./dessert.common"], function dessertCustomTagModule(common) {
        var attrs = common.attrs;
        var CUSTOM_TAG_LITERAL = "CUSTOM_TAG_LITERAL";
        var customTag = {
            /**
             * Creates a new CustomTag class instance with the given name and
             * custom tag defintion.
             * 
             * @param {String} name The name of the custom tag.
             * @param {Object} definition The definition of the custom tag that tells dessertJS
             * how to render the custom tag.
             * @returns {CustomTag} A new instance of the CustomTag class.
             */
            create: function create(name, definition) {
                return new CustomTag(name, definition);
            },
            /**
             * Defines how dessertJS should render the custom tags as dessertJS element attributes.
             * 
             * Supported tag rendering modes are:
             * 1. [dsrt-src],
             * 2. [dsrt-control],
             * 3. [dsrt-component],
             * 4. CUSTOM_TAG_LITERAL
             */
            types: {
                externalModule: common.attrs.src,
                control: common.attrs.control,
                component: common.attrs.component,
                literal: CUSTOM_TAG_LITERAL
            },
            /**
             * Initializes all of the custom tags in the application scope based on all
             * of the custom tags that were configured in the application. 
             * 
             * @param {Application} app The application to initialize the tags in.
             */
            init: function init(app) {
                var $customTags;
                var $ = null;

                if (app.providers.jquery) {
                    $ = app.providers.jquery;
                }

                if (app && app.getCustomTags) {
                    //If this is truly an application instance, it should have a getCustomTags function defined.
                    app
                        .getCustomTags()
                        //Loop over each custom tag definition.
                        .forEach(function dessertCustomTagInitForEach(tag) {
                            //Keep a reference to the custom tags that were found using the custom tag's tag property.
                            $customTags = $(tag.tag);
                            //Iterate over each custom tag member in the view and rneder them accordingly.
                            $customTags.each(function $customTagEach() {
                                var $customTag;
                                var $customTagSwap;
                                var $customTagAttrs;
                                var swapHtml = tag.replaceWith.trim().length > 0 ? tag.replaceWith : "<div></div>";
                                var excludeAttrs = ["id"];
                                //Keep a reference to the jquery custom tag object.
                                $customTag = $(this);
                                //Create the content to swap out the custom tag with.
                                $customTagSwap = $(swapHtml);
                                //Set some attributes so dessertJS knows how to render the content.
                                $customTagSwap.attr(tag.renderAs, tag.renderAsValue);
                                switch (tag.renderAs) {
                                    case attrs.component:
                                        //If it's a component, don't excluse any attrs.
                                        excludeAttrs.length = 0;
                                        break;
                                    case attrs.src:
                                        break;
                                    case attrs.control:
                                        //If it's a control, set the renderAs property value ot the id of the custom tag.
                                        //Controls require that they have a name, and be unique, because controls get added
                                        //to the views in a dictionary.
                                        $customTagSwap.attr(tag.renderAs, $customTag.prop("id"));
                                        break;
                                    default:
                                        break;
                                }

                                //Get all of the attributes of the custom tag element.
                                $customTagAttrs = common
                                    .utils
                                    .getElementAttrs($customTag, excludeAttrs);

                                //Add all of the custom tag attributes to our new element. 
                                Object
                                    .keys($customTagAttrs)
                                    .forEach(function $customTagAttrsEach(key) {
                                        $customTagSwap.attr(key, $customTagAttrs[key]);
                                    });

                                //Replace the custom tag with out new content.
                                $customTag.replaceContent($customTagSwap);
                            });
                        });
                }
            }
        };

        /**
         * A class for creating a custom html tag in dessertJS.
         * 
         * @class
         */
        function CustomTag(definition) {
            this.renderAs = common.utils.emptyString;
            this.renderAsValue = common.utils.emptyString;
            this.name = common.utils.emptyString;
            this.tag = common.utils.emptyString;
            this.replaceWith = common.utils.emptyString;

            Object.assign(this, definition);
        }

        return customTag;
    });
})();