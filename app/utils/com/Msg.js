Ext.define('MyDesktop.utils.com.Msg', {
	extend: 'Ext.window.Window',
	alias: ['widget.confirm'],
	width:300,
	modal:true,
	buttonAlign:'center',
	bodyCls:'modal-win',
	initComponent: function() {
		var me = this;
		//YES:2,YESNO:6,YESNOCANCEL:14
		Ext.applyIf(me, {

		     html: [
		     '<div class="win-content">',
		     	'<div class="win-icon win-info">',
		     	'</div>',
		     	'<div class="win-text">',
		     		'<p>'+me.msg+'<p>',
		     	'</div>',
		     '</div>'
		     ].join(''),
		     buttons:[
			         {
			             xtype:'button',
			             text:'Ok',
			             name:'guardar',
			             active:true,
			             scope:me,
			             enableToggle: true,
			             handler:function(self){
			             	me.fireEvent("yes",me);
			             },
			             cls:'x-btn-default-small-over', 
			         },
			         {
			             xtype:'button',
			             text:'No',
			             hidden:true,//(me.actions==2),
			             // iconCls:'cancel-icon',
			             // cls:'btn btn-large',                          
			             handler:function(self){
			                  self.up('window').close();
			             },
			             cls: 'ux-action-btn'
			         }
	         ]
		});

		me.callParent(arguments);
	}
});