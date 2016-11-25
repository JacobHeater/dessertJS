(function () {
    "use strict";

    define(dessertInterfacesModule);

    /**
     * The require entry point for the dessert.interfaces module.
     * 
     * @returns {Object} The dependencies hash table.
     */
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
        } else {
            throw new InvalidArgumentError("implementation", "object");
        }
    }
     
    /**
     * An error message for when any interface members are not implemented.
     * 
     * @class
     * 
     * @param {String} interfaceName The name of the interface that correlates to this error.
     * @param {String} methodName The name of the method that was not implemented.
     */
    function NotImplementedError(interfaceName, methodName) {
        var message = 'Method "' + methodName + '" not implemented in interface "' + interfaceName + '"!';
        
        Error.call(this);

        this.message = message;

        return this;
    }

    NotImplementedError.prototype = Object.create(Error.prototype);
    NotImplementedError.prototype.constructor = NotImplementedError;
})();