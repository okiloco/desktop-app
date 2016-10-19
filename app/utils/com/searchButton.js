Ext.define('MyDesktop.utils.com.searchButton', {
	extend: 'Ext.container.Container',
	alias: ['widget.searchbutton'],
	layout:{
		type:"hbox",
		align:"stretch"
	},
	ui:"notmal",
	defaults:{
		// ui:"btn"
	},
	filtro:false,
	initComponent: function() {
		var me = this;

		Ext.apply(me, {

			items:[
				{
					xtype: 'button',
					// iconCls:'icon-search-16',
					iconCls:'icon-filter-add-blue',
					tooltip: 'Buscar',
					cls:"x-btn-default-toolbar-small btn-left",
					name: 'filtrar',
					handler:function(self){
						me.fireEvent("search",self);
					}
				},
				{
					xtype: 'button',
					// iconCls:'icon-remove-16',
					iconCls:'icon-filter-delete-blue',
					tooltip: 'Limpiar',
					cls:"x-btn-default-toolbar-small btn-right",
					name: 'limpiar',
					handler:function(self){
						me.fireEvent("clear",self);
					}
				}
			]
		});

		/*Adaptación de Eventos para filtro Enter (filtrar) shift + Enter (clear)*/
		me.on("afterrender",function(field){
			var toolbar=field.up("toolbar"),
			filtro=toolbar.down("[name=filtro]");

			if(filtro!=null){
				var map = new Ext.util.KeyMap({
				    target: filtro.getId(),
				    binding: [
				    {
				    	key: [10,13],
				        shift:true,
				        fn: function(){ 
				        	me.fireEvent("clear",self);
				        }
				    }]
				});

				filtro.on("specialkey",function(field,e){
					if (e.getKey() == e.ENTER) {
			            me.fireEvent("search",field);
			        }
				});
			}	
		});

		me.callParent(arguments);
	}
});