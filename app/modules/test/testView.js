Ext.define('Desktop.modules.test.testView', {
	extend: 'Ext.panel.Panel',
	alias: ['widget.testview'],

	initComponent: function() {
		var me = this;
		console.log(Constants.URL_TEST);
		Ext.applyIf(me, {
			items:{
				html:Helper.TEXT_EXAMPLE
			}
		});

		me.callParent(arguments);
	}
});