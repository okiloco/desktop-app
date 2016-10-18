Ext.define('MyDesktop.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('dashboard', true);
    },

    onLoginButton: function(self) {

        window['adrum-start-time']= new Date().getTime();
        var form = self.up('form'),
        me=this;
        if (form.getForm().isValid()) {

            window.localStorage.setItem('logIn', 1);
            location.reload();

           /* form.getForm().submit({
                url: constants.URL_LOGIN_APP,               
                waitMsg: 'Procesando...',
                success: function(form, action) {
                    var permisos = action.result.permisos;
                    Ext.Array.each(permisos, function(record, index, countriesItSelf) {
                       window.localStorage.setItem(record.nombre_permiso, record.activo =='t');
                    });
                    window.localStorage.setItem('logIn', 1);
                    window.localStorage.setItem('id_usuario', action.result.id_usuario);
                    window.localStorage.setItem('usuario', action.result.usuario);
                    window.localStorage.setItem('tab_active', 0);
                    me.redirectTo('cargarcsv', true);
                    // location.reload();
                },
                failure: function(form, action) {
                    switch (action.failureType) {
                        case Ext.form.action.Action.CLIENT_INVALID:
                            Ext.Msg.alert('Falló', 'Los campos del formulario no podrán presentarse con valores no válidos');
                            break;
                        case Ext.form.action.Action.CONNECT_FAILURE:
                            Ext.Msg.alert('Falló', 'Comunicación Ajax falló');
                            break;
                        case Ext.form.action.Action.SERVER_INVALID:
                           Ext.Msg.alert('Falló', action.result.msg);
                   }
                }
                                   
            });*/
            location.reload();
        }   
        // this.redirectTo('dashboard', true);
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('dashboard', true);
    },

    onResetClick:  function() {
        this.redirectTo('dashboard', true);
    }
});