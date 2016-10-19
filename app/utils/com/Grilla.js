Ext.define('MyDesktop.utils.com.Grilla', {
    alias : 'widget.grilla',
    tieneBuscar : false,
    tieneBotonesPaginador : true,
    multiSelect: true,
    tienePaginador : true,
    extend : 'Ext.grid.GridPanel',
    enableColumnHide : false,
    tieneActualizar : false,
    tieneGrouping : false,
    remoteFilter : false,
    simpleSummary : false,
    tipoGrouping : 'grouping',
    textPaginador : 'items',
    iconColumnHide: false,
    paginar:true,
    filtro:false,
    // disabled:true,
    forceFit:true,
    // requires : ['Core.classes.ProgressBarPager', 'Core.classes.FilterRow'],
    viewConfig : {
        stripeRows : true,
        enableTextSelection : true
    },
    
    initComponent : function () {
        var me=this;
        var toolbarPaginador = new Ext.PagingToolbar({
                store : me.getStore(),
                displayInfo : true,

                // displayMsg : this.tieneBotonesPaginador ? '{0} - {1} de {2} ' + this.textPaginador : '{2}' + " " + this.textPaginador,
                displayMsg : (me.paginar)?'{0} - {1} de {2} ':'Total '+ ((typeof(me.title)=="undefined" && !me.paginar)?' Registros':me.title)+' {2} ' + (typeof(me.title)=='undefined'?' ':me.title),
                emptyMsg : 'No hay ' + me.textPaginador,
                pageSize : me.cantidadRegistrosPaginador,
                prevText : "Pagina anterior",
                nextText : "Pagina siguiente",
                firstText : "Primera pagina",
                lastText : "Ultima pagina",
                beforePageText : "Pagina",
                refreshText : 'Actualizar '+this.textPaginador,
                afterPageText : 'de {0}',
                // plugins : Ext.create('Core.classes.ProgressBarPager', {}),
                listeners : {
                    afterrender : function (component, eOpts) {
                        
                        if (!me.tieneBotonesPaginador) {
                            
                            for (var i = 0; i < component.items.length - 2; i++) {
                                component.items.get(i).hide();
                            }
                            var btnact = component.items.get(10);
                            btnact.show();
                            // btnact.setText('Actualizar');
                        }
                        var btnact = component.items.get(10);
                        if(!me.paginar){
                            for (var i = 0; i < component.items.length - 2; i++) {
                                component.items.get(i).hide();
                            }
                            btnact.show();
                            btnact.setText('Actualizar');
                        }
                        if (me.tieneActualizar) {
                            
                            btnact.show();
                            // btnact.setText('Actualizar');
                        }                       
                        toolbarPaginador.down('button[itemId="refresh"]').setDisabled((me.getStore().getCount()==0));
                        me.getStore().on('refresh',function(store,e){
                            // btnact.setText('Actualizar');                            
                            if(toolbarPaginador.down('button[itemId="refresh"]')!=null){
                                toolbarPaginador.down('button[itemId="refresh"]').setDisabled((me.getStore().getCount()==0));
                            }
                        });

                        me.getStore().on('clear',function(store,e){
                            /*Limpiar los ExtraParams*/
                            if(me.filtro){
                                var toolbar=me.down('toolbar[dock="top"]');
                                console.log(toolbar);
                                Ext.Array.each(toolbar.query('field'),function(item,index){
                                    if(!item.readOnly){
                                        item.reset();                                   
                                    }
                                    store.getProxy().extraParams[item.name]=item.getSubmitValue();
                                });
                                store.loadPage(1);
                                component.down('button[itemId="refresh"]').setDisabled(true);
                            }
                        });
                    },

                }
            
        });
        

        
        /*Ext.Array.each(toolbarPaginador.query('button'),function(item,index){
            console.log(ite);
        });*/
        // console.log(toolbarPaginador.down('button[itemId="refresh"]'));
        // console.log(toolbarPaginador);
        
        if (this.tieneGrouping) {
            me.features = [{
                    ftype : this.tipoGrouping,
                    groupHeaderTpl : '{name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})'                 
                }
            ];
            
        }
        if (this.simpleSummary) {
            me.features = [{
                    ftype : 'summary'
                }
            ]
        }
        
        if (me.paginar){
            me.bbar = toolbarPaginador;                         
        }else{
            me.getStore().getProxy().startParam=undefined;
            me.getStore().getProxy().limitParam=undefined;
        }
        if (this.tieneBuscar){
            me.plugins = Ext.create('Core.classes.FilterRow', {
                remoteFilter : me.remoteFilter
            });
        }

        if(this.iconColumnHide){
            //funcion para ocultar iconos de la me
            me.addListener( 'itemmouseenter',function (view, task, node, rowIndex, e) {
                var icons = Ext.DomQuery.select('.x-action-col-icon', node);
                Ext.each(icons, function (icon) {
                    Ext.get(icon).removeCls('x-hidden');
                });
            });
            //funcion para mostrar iconos de la me
            me.addListener( 'itemmouseleave' , function (view, task, node, rowIndex, e) {
                var icons = Ext.DomQuery.select('.x-action-col-icon', node);
                Ext.each(icons, function (icon) {
                    Ext.get(icon).addCls('x-hidden');
                });
            });
        }
        me.callParent(arguments);
    }
});