Ext.define("MyDesktop.utils.Store",{
	extend: "Ext.data.Store",			
	constructor:function(config){
		var me=this;
		if(typeof(config.url)!="undefined"){
			Ext.apply(config,{
				autoLoad:(typeof(config.utoLoad)!="undefined")?config.utoLoad:true,
				proxy: {
			         type: 'ajax',
			         url: config.url,
			         reader: {
			             type: 'json',
			             actionMethods:{
			             	read:(typeof(config.method)!="undefined")?config.method:'POST'
			             },
			             rootProperty: (typeof(config.root)!="undefined")?config.root:'data'
			         }
			     }
			 });
		}
	    me.callParent([config]);
	}	
});

