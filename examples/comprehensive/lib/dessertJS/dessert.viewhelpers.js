!function(){"use strict";function e(e,o,a,m,h){return c=e,p=c.selectors,l=c.utils,i=o,u=e.attrs,s=a,d=m,f=h,{renderComponent:n,renderControl:t,renderExternalModule:r}}function t(e,t,n,r,o){e.trackedElements.add(n),o&&o.append(n),t.controls.add({name:r,elem:n,view:t,app:e})}function n(e,t,n,r,o,s){var o,d;if(e.trackedElements.add(n),d=e.components.get(r),o=o||n.prop(u.id),t.components[o]=new i,d)if(c.utils.isString(d)){var p=e.cache.componentCache.getEntry(d);p?c.utils.defer(function(){a(t,p,o,n,e,s)}):require([d],function(r){if(r){var i;if(c.utils.isFunction(r)&&r.prototype instanceof f)i=new r;else if(c.utils.isFunction(r)){var u=r(f);c.utils.isFunction(u)&&u.prototype instanceof f&&(i=new u)}i&&(e.cache.componentCache.addEntry(d,i),a(t,i,o,n,e,s))}})}else c.utils.isFunction(d)&&c.utils.defer(function(){var c,i=e.cache.componentCache.getEntry(r);i?c=i:(c=new d,e.cache.componentCache.addEntry(r,c)),a(t,c,o,n,e,s)})}function r(e,t,n,r){if(t=l.cleanPath(t),t&&!/undefined/g.test(t)){var a=e.cache.externalModuleCache.getEntry(t);a?(o(a,n,e),r()):(e.providers.jquery&&(s.jquery=e.providers.jquery),s.get(t).done(function(r){e.cache.externalModuleCache.addEntry(t,r),o(r,n,e)}).fail(function(t){n.is(p.page)&&e.httpHandlers.page.getHandlersByStatusCode(t.status).forEach(function(e){e.handler(t,$routing)})}).always(l.isFunction(r)?r:function(){}))}}function o(e,t,n){var r=$(e);0===r.length&&"string"==typeof e&&e.trim().length&&(r=e),t.is(p.page)?(t.setContent(r),t.removeAttr(u.src)):t.attr("embed")&&"true"===t.attr("embed").toLowerCase()?(t.setContent(r),t.removeAttr(u.src)):t.replaceContent(r),d.init(n)}function a(e,t,n,r,o,a){t&&r&&t.render(function(c){a?r.append(c):r.replaceContent(c);var i=new t.constructor(c);o.providers.IDataBindingProvider&&(i.bindTemplateToData=o.providers.IDataBindingProvider.bindTemplateToData),Array.isArray(t.constructorInstances)&&t.constructorInstances.push(i),e.components[n].notify(i,[i])})}var c,i,s,d,u,p,l,f;define(["./dessert.common","./dessert.asyncresource","./dessert.ajax","./dessert.customtag","./dessert.component"],e)}();