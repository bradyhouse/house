Ext.onReady(function () {

    Ext.QuickTips.init();

    var fiddleHeader = 'Fiddle ~ Table Layout',
        fiddleSubHeader = '<i>Fiddle exploring how create a panel with a custom table layout.</i>',
        panel = Ext.create('Ext.Panel', {
        layout: {
            type: 'table',
            columns: 2
        },
        defaults: {
            width: 320,
            height: 200,
            margin: 10
        },
        items: [{
            xtype: 'label',
            text: 'cell 1'
        }, {
            xtype: 'label',
            text: 'cell 2'
        }, {
            xtype: 'label',
            text: 'cell 3'
        }, {
            xtype: 'panel',
            layout: {
                type: 'table',
                columns: 1
            },
            defaults: {
                xtype: 'button',
                width: 320,
            },
            items: [{
                text: 'button 1',
                margin: '0 5 0 0',
                height: 105
            }, {
                text: 'button 2',
                height: 85,
                margin: '10 0 0 0'
            }]
        }]
    }),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            modal: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: panel
        });
    win.show();

    // Boiler Plate
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader,
            subheader: fiddleSubHeader
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
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
