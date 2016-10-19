Ext.define('MyDesktop.utils.searchField', {
	extend: 'Ext.container.Container',
	alias: ['widget.searchfield'],
	
	ui:"notmal",
	defaults:{
		// margin:1,

		// ui:"btn"
	},
	
	filtro:false,
	initComponent: function() {
		var me = this;
		Ext.apply(me, {
			multiline:(typeof(me.multiline)!="undefined")?me.multiline:false,
			layout:{
				type:"hbox",
				align: 'center'
			},
			items:[
				{
					xtype: (me.multiline)?'textarea':'textfield',
					grow:(me.multiline),
					growMax:100, 
					width:(typeof(me.width)!="undefined")?me.width:'100%',
					allowBlank:(typeof(me.allowBlank)!="undefined")?me.allowBlank:true,
					name: (typeof(me.name)!="undefined")?me.name:'filtro',
					emptyText: (typeof(me.emptyText)!="undefined")?me.emptyText:'Filtrar'
				},
				{
					layout:{
						type:(me.multiline)?"vbox":"hbox",
					},
					border: 0,
				    style: {borderColor:'transparent', borderStyle:'solid', borderWidth:'0px'},
				    bodyPadding:(me.multiline)?'5px 0px':'0px',
					defaults:{
						margin:(me.multiline)?2:1,
						padding:(me.multiline)?2:0
					},
					items:[
						{
							xtype: 'button',
							iconCls:(typeof(me.trigger1Cls)!="undefined")?me.trigger1Cls:"icon-filter-add-blue",
							tooltip:(typeof(me.trigger1Tooltip)!="undefined")?me.trigger1Tooltip:'Enviar '+me.emptyText,
							maxHeight:24,
							maxWidth:24,
							name: 'filtrar',
							// cls:"x-btn-default-toolbar-small",
							scope:me,
							handler:function(self){
								var field=me.down("field");
								me.fireEvent("search",me);
							}
						},
						{
							xtype: 'button',
							name: 'limpiar',
							// cls:"x-btn-default-toolbar-small",
							maxHeight:24,
							iconCls:(typeof(me.trigger2Cls)!="undefined")?me.trigger2Cls:"icon-filter-delete-blue",
							tooltip:(typeof(me.trigger2Tooltip)!="undefined")?me.trigger2Tooltip:'Limpiar',
							hidden:true,
							handler:function(self){
								var field=me.down("field");
								me.fireEvent("clear",me);
							}
						}
					]
				} 
			]
		});

		/*Adaptación de Eventos para filtro Enter (filtrar) shift + Enter (clear)*/
		me.on("afterrender",function(self){
			var field=me.down("field");	
			field.focus(false,100);	
			if(field!=null){
				var map = new Ext.util.KeyMap({
				    target: field.getId(),
				    binding: [
				    {
				    	key: [10,13],
				        shift:true,
				        fn: function(){ 
				        	me.fireEvent("clear",field);
				        }
				    }]
				});

				field.on("specialkey",function(self,e){
					if (e.getKey() == e.ENTER) {
			            me.fireEvent("search",field);
			        }
				});
			}

			field.on("change",function(self){
				me.down("[name=limpiar]").setVisible((self.getValue()!=''));
			});

			/*Cuando está dentro de un editor en una column*/
			if(typeof(me.up("editor"))!="undefined"){
		        me.up("editor").on("startedit",function(self){
		        	var field=me.down("field");
					field.focus(false,100);	
				});							       
			}

		});

		me.on("clear",function(self){
			var field=me.down("field");
			me.down("[name=limpiar]").setVisible(false);
			field.isValid();
		    field.reset();
		    field.focus();
		});

		me.on("search",function(field){
			// console.info("field search.",field);
		});
		me.callParent(arguments);
	},
	getField:function(){
		var me=this,
		field=me.down("field");
		return field;
	},
	reset:function(){
		var me=this,
		field=me.getField();
		field.reset();
	},
	setValue:function(newValue){
		var me=this,
		field=me.getField();
		field.setValue(newValue);
	},
	getValue:function(){
		var me=this,
		field=me.getField();
		return field.getValue();
	},
	isValid:function(){
		var me=this,
		field=me.getField();
		return field.isValid();
	}
});