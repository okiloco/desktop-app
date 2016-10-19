
/**
 * @class Core.util.com.comboDonec
 * @extends Ext.form.ComboBox
 * Description
 */
Ext.define('MyDesktop.utils.com.Combo', {
        extend: 'Ext.form.ComboBox',       
        alias:'widget.listBox',                         
        fieldLabel: '',        
    	displayField: '',
    	valueField: '',
        // forceSelection:true,
        //forceSelection:true, (NO USAR POR DEFECTO)
        //         // selectOnFocus: true,
        triggerAction:'query',			            
        // typeAheadDelay:0,				                        
        store:null,
        valid:true,
        anyMatch:true,
        typeAhead: false,
        queryDelay:0, 
        enableKeyEvents:true,
        queryMode: 'local',
        triggerCls:"trigger-icon trigger-search",
        constructor:function(config){
            var me=this;
            Ext.apply(config,{
                triggers: {
                    clear: {
                        cls: 'trigger-icon trigger-clear',
                        weight: 1, // negative to place before default triggers
                        handler:me.onTrigger1Click 
                    }
                }
            });
            this.callParent([config]);
        },          
        initComponent:function(){
            var me=this;
            var controller=me.listeners;
            //delete me.listeners;
            /*me.on('afterrender',function(self){
                if(self.getValue()==null){
                    me.getTrigger("clear").hide();
                }
            }); */                     
            me.getStore().on('filterchange',function(store, filters, eOpts){

               if(me.forseSelection){
                   me.valid=(store.getCount()>0);
                   if(!me.valid){
                     me.collapse();
                   }

                   me.fireEvent('filtered',me,me.valid);
                   if(typeof(controller)!='undefined'){
                       if(controller.hasOwnProperty('filtered')){
                            me.on('filtered',controller.filtered);                    
                       }
                   }
               }
            });
           
            Ext.apply(me,{
                name:me.name,
                fieldLabel:me.fieldLabel,
                displayField:me.displayField,
                valueField:me.valueField,
                store:me.store,
                forseSelection:(typeof(me.forseSelection)!='undefined')?me.forseSelection:true,
                listConfig: {
                    loadingText: 'Buscando...',
                    emptyText: 'No se encontrarón coincidencias',
                    getInnerTpl: function() {                              
                        return '{'+me.displayField+'}';
                    }            
                },
                listeners:{

                 beforequery: function(record){  
                    if(me.queryMode=='local'){
                        try{
                            record.query = new RegExp(record.query, 'i');                
                            record.forceAll = true;
                        }catch(e){
                            
                        }
                    }
                  },  
                  render : function(self) {
                    var limpiar=self.triggerEl.elements[1];
                    var filtrar=self.triggerEl.elements[0];
                    if(self.getValue()==null){
                        limpiar.hide();                        
                    }

                    limpiar.tooltip="Limpiar";

                    tooltip=self.fieldLabel;
                    tooltip=(tooltip!="")?tooltip:self.emptyText;
                    tooltip=(tooltip!="")?"Filtrar "+tooltip:"Filtrar";
                    filtrar.tooltip=tooltip;
                    Ext.Array.each(self.triggerEl.elements,function(item,index){
                        console.log(item);
                        Ext.tip.QuickTipManager.register({
                            target: item.getAttribute("id"),
                            // title: 'My Tooltip',
                            text: item.tooltip,
                            // width: 100,
                            dismissDelay: 10000 // Hide after 10 seconds hover
                        }); 
                    });
                  },
                  blur:function(self){

                   var record=self.findRecordByDisplay(self.getRawValue()); 
                   if(!record){
                        me.reset();
                   }else{
                        self.setValue(record.get(self.valueField));
                   }
                  },
                  change:function(self){
                    var limpiar=me.getTrigger("clear"); 
                    if(self.getValue()!=null){
                        this.autoSelect=true;
                        limpiar.show();
                    }else{
                        this.autoSelect=false;
                        limpiar.hide();
                    }
                  }
                }
            });
            /*Corregir problema de sobrescritura de métodos*/
            if(typeof(controller)!='undefined'){
                Ext.Object.each(controller,function(eName,fn){
                    if(typeof(fn)=='function'){
                        if(me.listeners.hasOwnProperty(eName)){
                            me.on(eName,fn);
                        }else{
                            me.listeners[eName]=fn;  
                        }

                        if(eName=='specialkey'){
                            me.listeners['keyup']=function(self,e){
                                me.fireEvent('keypress',self,e);
                                me.pressed=false;
                            };
                            me.on('keypress',function(self,e){

                                    if (e.getKey() == e.ENTER) { 
                                        //console.log(e.getKey())
                                        if(me.valid){
                                            if(!me.pressed){

                                                var record=self.findRecordByDisplay(self.getRawValue());
                                                if(record){                                                    
                                                    self.setValue(record.get(self.valueField));
                                                }else{
                                                   me.focus();
                                                   me.collapse(); 
                                                   me.clearValue();
                                                }
                                               me.pressed=true;
                                               me.fireEvent('keyENTER',self,e); 
                                            }   
                                        }else{
                                            me.reset();
                                            me.clearValue();
                                            // me.setValue('');
                                        }
                                    }
                            })
                            me.on('keyENTER',fn);
                            delete me.listeners['specialkey'];
                        }
                    } 
                });                   
            };
            /*Al seleccionar si tiene valor por defecto hacer visible el boton limpiar*/
            me.on("focus",function(field){
                if(field.getValue()!=null){
                    this.getTrigger("clear").show();
                }
            });
            me.callParent(arguments);            
        },
        onTrigger1Click:function(self){
            this.collapse();
            // this.reset();
            this.setValue("");
            this.getTrigger("clear").hide();
            this.focus();
        },
        onTrigger2Click:function(self){
            this.focus();
            if(!this.isExpanded){
              this.expand();
            }else{
              this.collapse();  
            }
        }
        
});	