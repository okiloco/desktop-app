/*!
* Copyright(c) 2006-2014 Sencha Inc.
* licensing@sencha.com
* http://www.sencha.com/license
*/

// From code originally written by David Davis (http://www.sencha.com/blog/html5-video-canvas-and-ext-js/)

Ext.define('Desktop.modules.test.test', {
    extend: 'Ext.ux.desktop.Module',

    uses: [
        'Ext.ux.desktop.Video'
    ],

    id:'test',
    windowId: 'test-window',

    tipWidth: 160,
    tipHeight: 96,

    init : function(){
        this.launcher = {
            text: 'Test Module',
            iconCls:'video'
        }
    },

    createWindow : function(){
        var me = this, desktop = me.app.getDesktop(),
            win = desktop.getWindow(me.windowId);

        if (!win) {
            win = desktop.createWindow({
                id: me.windowId,
                title: 'Test Module',
                width: 740,
                height: 480,
                iconCls: 'video',
                animCollapse: false,
                border: false,

                layout: 'fit',
                items: [
                	Ext.create('Desktop.modules.test.testView')
                ],
                listeners: {
                    beforedestroy: function() {
                        me.tip = me.ctx = me.videoEl = null;
                    }
                }
            });
        }

        if (me.tip) {
            me.tip.setTarget(win.taskButton.el);
        }

        return win;
    }
});
