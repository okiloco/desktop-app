Ext.define('Desktop.modules.test.testView', {
	extend: 'Ext.form.Panel',
	alias: ['widget.testview'],

	initComponent: function() {
		var me = this;

		
		Ext.define('Persona', {
			extend: 'Ext.data.Model',
			fields:[
				'nombre',
				'email',
				'telefono'
			]
			
		});

		var model=Ext.create('Persona',{
			nombre:'xsas',
			email:'xsas@c.co',
			telefono:'23232'
		});

		Ext.applyIf(me, {
			
			items:[
				{
					xtype: 'textfield',
					name: 'nombre',
					fieldLabel: 'Nombre'
				},
				{
					xtype: 'textfield',
					name: 'email',
					fieldLabel: 'Email'
				},
				{
					xtype: 'textfield',
					name: 'telefono',
					fieldLabel: 'Telefono'
				},
				{
					xtype: 'listBox',
					name: 'tipo',
					fieldLabel: 'Tipo',
					store: Ext.create('Ext.data.Store', {
					    fields: ['value', 'name'],
					    data : [
					        {"value":"AL", "name":"Alabama"}        
					    ]
					}),
					queryMode: 'local',
				    displayField: 'name',
				    valueField: 'value'
				},
				Ext.create('Ext.form.field.ComboBox', {
				    fieldLabel: 'My Custom Field',
				    triggers: {
				        foo: {
				            cls: 'my-foo-trigger',
				            weight: -2, // negative to place before default triggers
				            handler: function() {
				                console.log('foo trigger clicked');
				            }
				        },
				        bar: {
				            cls: 'my-bar-trigger',
				            weight: -1,
				            handler: function() {
				                console.log('bar trigger clicked');
				            }
				        }
				    }
				})
			],
			listeners:{
				afterrender:function(self){
					self.loadRecord(model);
				}
			}
			
		});

		me.callParent(arguments);
	}
});