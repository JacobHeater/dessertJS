define(['../../../src/dessert.core'], function (dessert) {
    return dessert
    .app('package')
    .onInit(function() {
        this.src = "./views/";
        this.templates = "./templates/";
        this.dessertPath = "./scripts/dessert/";
    })
    .cache()
    .ready();
});
