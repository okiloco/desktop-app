Ext.define("MyDesktop.utils.Store",{
	extend: "Ext.data.Store",			
	alias:'ux-store',
	autoLoad:true,
	constructor	: function(options){
		var me =this;
		Ext.apply(me,options || {});
		Ext.apply(me,{
			pageSize:(me.pageSize!=undefined)?me.pageSize:20,
		});
		if(typeof(me.method)!='undefined'){
			me.actionMethods=me.method;
		}
		var reader={
            type:'json',
            root:(me.root!=undefined)?me.root:'data',
            totalProperty: "total",
            
        };
		if(typeof(me.reader)!='undefined'){
			me.reader=Ext.apply(reader,me.reader);
		};
		 
		me.proxy={				
            url: me.url,	            
            type:'ajax',
            model: me.model,
            timeout: (me.timeout!=undefined)?me.timeout:30000,
            fields:me.fields,
            // headers: {'Authorization': sessvars.impveh_session.token},
           
            actionMethods: {
                read : (me.actionMethods!=null)?me.actionMethods:'POST'
            },
			pageParam: undefined,
            /*limitParam: undefined,
			startParam: undefined,*/
			noCache: false,
           reader:reader
        };

        if(typeof(me.extraParams)!="undefined"){
        	Ext.applyIf(me.proxy,{
        		extraParams:me.extraParams
        	});
        }

        if(typeof(me.params)!="undefined"){
        	Ext.applyIf(me.proxy,{
        		extraParams:me.params
        	});
        }
	    /*if(typeof(me.api)!='undefined'){
	     	me.proxy.api=me.api;
	    }*/		
		me.callParent(arguments);
		
	},
	resetStartParam:function(){

	    //get the latest store options
	    var storeOptions=this.lastOptions;

	    if(storeOptions!=undefined){

        //get the param names
        var pn = this.paramNames;

        //get the params from options
        var params=storeOptions.params;

        //change the param start value to zero
        params[pn.start] = 0;

        //reset options params with this new params
        storeOptions.params=params;

        //apply this new options to store options
        this.storeOptions(storeOptions);
        }
    }
	/*,constructor	: function(options){
		var me = this;
		
		Ext.apply(me,options || {});
		me.proxy = {
	       type		: "ajax",
	       url		: me.url,
	       model: me.model,
	       timeout: me.timeout,
	       extraParams:me.extraParams,
	       actionMethods : {
					read : 'POST'
				},
	       reader	: {
	           	type			: "json",
	           	root			: me.root,
	           	successProperty	: "success",
				totalProperty	: "total"
	       },
	       
	       startParam: me.start,
	       limitParam: me.limit

	   };
	
		me.callParent(arguments);
	}*/
});

