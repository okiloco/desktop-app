Ext.define('Desktop.modules.test.testView', {
	extend: 'Ext.panel.Panel',
	alias: ['widget.testview'],
	layout:{
		type:'border',
	},
	initComponent: function() {
		var me = this;
		
		Ext.applyIf(me, {
			items:[
				{
					xtype:'form',
					region:'west',
					bodyPadding:'5px',
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
								fields:[
									'className'
								],
								url:Constants.URL_MODULOS
							}),
							queryMode: 'local',
						    displayField: 'className',
						    valueField: 'className'
						},
						{
							xtype:'searchfield',
							// multiline:true,
							emptyText:'Buscar',
							listeners:{
								search:function(self){
									console.log("search");
								}
							}
						}
					],
					buttons:[
						{
							xtype: 'button',
							text:'Enviar'
						}
					]
				},
				{
					xtype:'grilla',
					region:'center',
					columns:[
						{
							text:'Modulo',
							dataIndex:'className'
						}
					],
					store: Ext.create('MyDesktop.utils.Store', {
						fields:[
							'className'
						],
						url:Constants.URL_MODULOS
					})
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