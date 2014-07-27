/* To utilze this template:

(1) Perform a find replace for the
string {{NAME_SPACE}} for the name
of the application.

(2) After defomom

 */


/*****************************

 DEFINE THE MAIN CONTAINER.

 ******************************/
Ext.define('{{NAME_SPACE}}.Main', {
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
    Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
        Risk.Ajax.verify(response);
    });
    Ext.Ajax.setDefaultHeaders({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    });
    /***************************
     5.0.0 CHANGE

     "UseDefaultXhrHeader" is new
     and it defaults to "true".

     ****************************/
    Ext.Ajax.setUseDefaultXhrHeader(false);

    Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
        Risk.Ajax.verify(response);
    });
    Ext.create('{{NAME_SPACE}}.store.navigation.UserCorps', {
        storeId: 'UserCorps',
        autoLoad: true
    });
    Ext.create('{{NAME_SPACE}}.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'usercorps'
        }]
    });
});