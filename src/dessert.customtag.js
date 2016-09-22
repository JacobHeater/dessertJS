define("dessert.customtag", ["jquery", "dessert.common"], function($, common) {
    "use strict";
    var attrs = common.attrs;
    var customTag = {
        create: function(name, definition) {
            return new CustomTag(name, definition);
        },
        types: {
            externalModule: common.attrs.src,
            control: common.attrs.control,
            component: common.attrs.component
        },
        init: function(app) {
            var $customTags;
            if (app && app.getCustomTags) {
                app.getCustomTags().forEach(function(tag) {
                    $customTags = $(tag.tag);
                    $customTags.each(function() {
                        var $customTag;
                        var $customTagSwap;
                        var $customTagAttrs;
                        var swapHtml = tag.replaceWith.trim().length > 0 ? tag.replaceWith : "<div></div>";
                        var excludeAttrs = ["id"];
                        $customTag = $(this);
                        $customTagSwap = $(swapHtml);
                        $customTagSwap.attr(tag.renderAs, tag.renderAsValue);
                        switch (tag.renderAs) {
                            case attrs.component:
                                excludeAttrs.length = 0;
                                break;
                            case attrs.src:
                                break;
                            case attrs.control:
                                $customTagSwap.attr(tag.renderAs, $customTag.prop("id"));
                                break;
                            default:
                                break;
                        }
                        $customTagAttrs = common.utils.getElementAttrs($customTag, excludeAttrs);
                        Object.keys($customTagAttrs).forEach(function(key) {
                            $customTagSwap.attr(key, $customTagAttrs[key]);
                        });
                        $customTag.replaceWith($customTagSwap);
                    });
                });
            }
        }
    };

    function CustomTag(definition) {
        this.renderAs = common.utils.emptyString;
        this.renderAsValue = common.utils.emptyString;
        this.name = common.utils.emptyString;
        this.tag = common.utils.emptyString;
        this.replaceWith = common.utils.emptyString;

        $.extend(this, definition);
    }

    return customTag;
});