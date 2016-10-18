/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'Desktop',

    //-------------------------------------------------------------------------
    // Most customizations should be made to Desktop.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------

    requires: [
        'Desktop.App',
        'MyDesktop.Login'
    ],
    init: function() {
        console.info(window.localStorage.getItem('logIn'));
        Ext.fly('appLoadingIndicator').destroy();
        var app = (window.localStorage.getItem('logIn')==1)?new Desktop.App():new MyDesktop.Login();
    }
});
