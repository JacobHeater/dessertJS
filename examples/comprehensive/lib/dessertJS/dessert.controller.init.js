!function(){"use strict";define(["./dessert.common","./dessert.view.init"],function(n,t){var e=n.selectors,r=n.attrs;return function(n,i,c,o,s,a){var u=null;c.providers.jquery&&(u=c.providers.jquery);var l,f,d=n.find(e.controller);d.length>0?d.each(function(){l=u(this),a||(f=i.controllers.get(l.attr(r.controller)),f&&(f.$controller=l,u.isFunction(f.onInit)&&f.onInit(),f.instance||f.instance instanceof f.constructor||(f.instance=new f.constructor),f.instance.isAsync?(f.instance.ready(function(){t(l,f,i,n,c,o,s,a)}),f.instance.init()):t(l,f,i,n,c,o,s,a)))}):t(l,f,i,n,c,o,s,a)}})}();