define(['../../../../src/muv.events'], function(events){
  return function(model, view, controller) {
    var controls = view.controls;
    var btnLogin = controls.btnLogin;
    var userName = controls.userName;
    var password = controls.password
    var lblErrorMsg = controls.lblErrorMsg;
    events(view, ['onLogin']);
    userName.muv.bind(model);
    password.muv.bind(model);
    view.invalidate = function() {
      lblErrorMsg.html("<b>User Name and Password are required!");
    };
    btnLogin.click(function() {
      view.onLogin.trigger(model);
    })
  };
});
