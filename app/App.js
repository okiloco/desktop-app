/*!
 * Ext JS Library
 * Copyright(c) 2006-2014 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Desktop.App', {
    extend: 'Ext.ux.desktop.App',

    requires: [
        'Ext.window.MessageBox',

        'Ext.ux.desktop.ShortcutModel',
        
    ],

    init: function() {
        // custom logic before getXYZ methods get called...

        this.callParent();

        // now ready...
    },

    getModules : function(){
        var dataModulos=JSON.parse(window.localStorage.getItem('MODULOS')),
        modulos=[];
        Ext.Array.each(dataModulos, function(record, index, total) {
            modulos[index]=Ext.create(record);
        });
        return modulos;
    },

    getDesktopConfig: function () {
        var me = this, ret = me.callParent(),
        dataModulosConfig=JSON.parse(window.localStorage.getItem('MODULOS_CONFIG')),
        modulosConfig=[];

        Ext.Array.each(dataModulosConfig, function(record, index, total) {
            modulosConfig[index]=record;
        });
        console.log(modulosConfig);
        return Ext.apply(ret, {
            //cls: 'ux-desktop-black',

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],

            shortcuts: Ext.create('Ext.data.Store', {
                model: 'Ext.ux.desktop.ShortcutModel',
                data: modulosConfig
            }),

            wallpaper: 'resources/images/wallpapers/lock-screen-background.jpg',
            wallpaperStretch: false
        });
    },

    // config for the start menu
    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: 'Don Griffin',
            iconCls: 'fa fa-user',
            height: 300,
            toolConfig: {

                width: 100,
                items: [
                    {
                        text:'Salir',
                        // iconCls:'logout',
                        iconCls:'fa fa-sign-out',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            startBtnText:'Inicio',
            /*quickStart: [
                { name: 'Accordion Window', iconCls: 'accordion', module: 'acc-win' },
                { name: 'Grid Window', iconCls: 'icon-grid', module: 'grid-win' }
            ],*/
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]

        });
    },

    onLogout: function () {
        Ext.Msg.confirm('Logout', 'Are you sure you want to logout?',function(buttonId){
            console.log(buttonId);
            if(buttonId=='yes'){
                window.localStorage.clear();
                location.reload();
            }
        });
    },

    onSettings: function () {
        var dlg = new Desktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
