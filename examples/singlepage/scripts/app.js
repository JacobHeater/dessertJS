define(['../../../src/muv.core'], function (muv) {
    return muv
    .app('package')
    .onInit(function() {
        this.src = "./views/";
        this.templates = "./templates/";
        this.muvPath = "./scripts/muv/";
    })
    .cache()
    .ready();
});
