Ext.define('Desktop.modules.test.testView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.testview'],
	bodyPadding:'5px',
	initComponent: function() {
		var me = this;
		
		Ext.define('Modulo', {
			extend: 'Ext.data.Model',
			fields:[
				'className'
			]
		});

		Ext.applyIf(me, {
			
			items:[
				{
					xtype: 'textfield',
					name: 'nombre',
					emptyText: 'Nombre'
				},
				{
					xtype: 'textfield',
					name: 'email',
					emptyText: 'Email'
				},
				{
					xtype: 'textfield',
					name: 'telefono',
					emptyText: 'Telefono'
				},
				{
					xtype: 'listBox',
					name: 'tipo',
					emptyText: 'Tipo',
					store: Ext.create('MyDesktop.utils.Store', {
					    fields: ['value', 'name'],
					    data : [
					        {"value":"AL", "name":"Alabama"}        
					    ]
					}),
					queryMode: 'local',
				    displayField: 'name',
				    valueField: 'value'
				},
				{
					xtype: 'listBox',
					name: 'className',
					emptyText: 'Modulo',
					width:200,
					store: Ext.create('MyDesktop.utils.Store', {
						model:'Modulo',
						url:Constants.URL_MODULOS
					}),
					queryMode: 'local',
				    displayField: 'className',
				    valueField: 'className'
				}
			],
			listeners:{
				afterrender:function(self){
					// self.loadRecord(model);
				}
			}
			
		});

		me.callParent(arguments);
	}
});