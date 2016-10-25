(function () {
    "use strict";

    define("dessert.interfaces", dessertInterfacesModule);

    function dessertInterfacesModule() {
        var interfaces = {
            IDataBindingProvider: IDataBindingProvider
        };

        return interfaces;
    }

    /**
     * An interface that describes a custom data binding tool that can be used
     * for databinding in the dessert framework.
     * 
     * @param {Object} implementation The object that contains the interface implementation
     */
    function IDataBindingProvider(implementation) {
        this.bindTemplateToData = function () {
            throw new NotImplementedError("IDataBindingProvider", "bindTemplateToData");
        };

        if (typeof implementation === "object") {
            Object
                .keys(implementation)
                .forEach(function(key) {
                    if (this.hasOwnProperty(key)) {
                        this[key] = implementation[key];
                    }
                }.bind(this));
        }
    }

    function NotImplementedError(interfaceName, methodName) {
        var message = 'Method "' + methodName + '" not implemented in interface "' + interfaceName + '"!';
        
        Error.call(this);

        this.message = message;

        return this;
    }

    NotImplementedError.prototype = Object.create(Error.prototype);
    NotImplementedError.prototype.constructor = NotImplementedError;
})();