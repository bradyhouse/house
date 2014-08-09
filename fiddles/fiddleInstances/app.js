/*****************************
 DEFINE A CUSTOM BUTTON CLASS
******************************/
Ext.define('Fiddle.CogButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.cogbutton',
    enableToggle: true,
    handler: 'onClickButton'
});

/*****************************
DEFINE A CUSTOM CONTAINER, WHICH
CONTAINS MULTIPLE INSTANCES OF THE
BUTTON.
 ******************************/
Ext.define("Fiddle.Cog", {
    extend: 'Ext.container.Container',
    alias: 'widget.cog',
    height: 52,
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    items: [
        {
            xtype: 'cogbutton',
            itemId: 'button1',
            text: 'instance 1'
        }, {
            xtype: 'cogbutton',
            itemId: 'button2',
            text: 'instance 2'
        },{
            xtype: 'cogbutton',
            itemId: 'button3',
            text: 'instance 3'
        }, {
            xtype: 'cogbutton',
            itemId: 'button4',
            text: 'instance 4'
        }

    ]
});

/*****************************
DEFINE THE MAIN CONTROLLER 
CLASS.
******************************/
Ext.define('Fiddle.MainController', {
    extend: 'Ext.app.ViewController',
    requires: [
        'Ext.MessageBox'
    ],
    alias: 'controller.main',
    onClickButton: function (btn) {
		 Ext.Msg.show({
                title: 'Click!',
             msg: btn.itemId,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR,
                width: 300
            });
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
        name: 'Fiddle exploring the use (and control) of multiple instances of the same class.'
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