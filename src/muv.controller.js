define(function () {
    //A Controller does the work of binding the Model <--> View
    var Controller = function (name, implementation) {
        this.name = name || "";
        this.ctor = implementation || function () { };
    };
    return Controller;
});