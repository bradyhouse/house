/*****************************
 DEFINE A CUSTOM BUTTON CLASS
 ******************************/
Ext.define('Fiddle.CogButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.cogbutton',
    enableToggle: false,
    handler: 'onClickButton'
});

/*****************************
 DEFINE A CUSTOM COG CONTAINER
 ******************************/
Ext.define("Fiddle.Cog", {
    extend: 'Ext.Container',
    xtype: 'cog',
    requires: [
        'Ext.layout.container.Table'
    ],
    layout: {
        type: 'table',
        columns: 2,
        tdAttrs: { style: 'padding: 10px; vertical-align: top;' }
    },
    items: [{
        xtype: 'panel',
        width: 50,
        items: [{
            dock: 'left',
            xtype: 'toolbar',
            items: [{
                text: 'on',
                xtype: 'cogbutton',
                itemId: 'maskOnButton'
            }, '-', {
                text: 'off',
                xtype: 'cogbutton',
                itemId: 'maskOffButton'
            }]
        }]
    } , {
        xtype: 'panel',
        itemId: 'content',
        reference: 'content',
        bind: {
            html: '{latin}'
        },
        width: 550
    }]
});

/*****************************
 DEFINE THE MAIN CONTROLLER
 CLASS.
 ******************************/
Ext.define('Fiddle.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onClickButton: function(btn) {
        if (btn.itemId === 'maskOnButton') {
            this.lookupReference('content').setLoading(true);
        } else {
            this.lookupReference('content').setLoading(false);
        }
    }
});

/*****************************
 DEFINE THE MAIN VIEW MODEL.
 NOTE - YOU CANNOT USE A
 VIEW CONTROLLER WITHOUT A
 VIEWMODEL.
 ******************************/
Ext.define('Fiddle.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'Fiddle exploring how to apply a load mask to a panel using the setLoading method.',
        latin: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
});

/*****************************
 DEFINE THE MAIN CONTAINER.
 ******************************/
Ext.define('Fiddle.Main', {
    extend: "Ext.container.Container",
    border:	true,
    padding: 10,
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    initComponent: function() {
        var me = this;
        Ext.each(me.items,function(item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border:	"1px solid #333"
                };
            }
        );
        me.callParent();
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);
        if(me.border){
            me.el.setStyle("border","1px solid #333");
        }
    },
    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
        region: 'north'
    }, { type: 'panel',
        region: 'center',
        xtype: 'cog'
    }]
});

/*****************************
 ONCE EXT IS READY, CONFIGURE
 EXT'S AJAX SETTINGS, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.
 ******************************/
Ext.onReady(function() {
    Ext.create('Fiddle.Main', {
        renderTo: Ext.getBody()
    });
});