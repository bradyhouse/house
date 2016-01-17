
// Boiler plate
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
    padding: 25,
    viewModel: {
        type: 'box'
    },
    items: [
        {
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [
                {
                    xtype: 'panel',
                    padding: 10,
                    border: false,
                    bind: {
                        html: '{subheader}'
                    }
                }
            ],
            region: 'north'
        }
    ]
});
Ext.onReady(function() {
    var fiddle = Ext.create('Fiddle.view.View'),
        win = Ext.create('Ext.Window', {
            title: 'Bound ComboBox',
            closable: false,
            maximizable: false,
            height: 100,
            width: window.innerWidth - 50,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 210;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
