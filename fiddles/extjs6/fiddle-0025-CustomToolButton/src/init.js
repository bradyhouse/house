// Boiler Plate
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
Ext.onReady(function () {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 192;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();
    window.setTimeout(function () {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
