
Ext.define('Fiddle.CogButton', {
    extend: 'Ext.button.Button',
    alias: 'widget.cogbutton',
    enableToggle: true,
    text: 'green',
    style: {
        color: '#000000',
        backgroundColor: '#00FF00'
    },
    toggle: function (btn) {
        var me = this;
        if (me.getText() === 'green') {

            Ext.fly('')

            me.text = 'red';
            me.style= {
                    backgroundColor: '#FF0000'
                };
        } else {
            me.text = 'green';
            me.style = {
                    backgroundColor: '#00FF00'
                };
        }
    }
});

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
            itemId: 'button1'
        }, {
            xtype: 'cogbutton',
            itemId: 'button2'
        }

    ]
});


/*****************************

 DEFINE THE MAIN CONTAINER.

 ******************************/
Ext.define('Fiddle.Main', {
    extend: "Ext.container.Container",
    border:	true,
    padding: 10,
    initComponent: function() {
        var me = this;
        Ext.each(me.items,function(item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border:	"1px solid #333"
                };
                item.padding = 10;
                item.height = 450;
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
    }
});

/*****************************

 ONCE EXT IS READY, CONFIGURE
 EXT'S AJAX SETTINGS, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.

******************************/
Ext.onReady(function() {
    Ext.create('Fiddle.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'cog'
        }]
    });
});