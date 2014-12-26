Ext.onReady(function() {
    var fiddleHeader = 'Fiddle Basic Pie Chart',
        fiddleSubHeader = '<i>Fiddle adapted from Sencha\'s <b>Chart Kitchen Sink\'s "Basic Pie Chart"</b> example.</i>';

    Ext.define('MyFiddle.BasicPieChart', {
        extend: 'Ext.Panel',
        xtype: 'pie-basic',
        flex: 1,
        initComponent: function() {
            var me = this;
            me.myDataStore = Ext.create('Ext.data.JsonStore', {
                fields: ['os', 'data1' ],
                data: [
                    { os: 'Android', data1: 68.3 },
                    { os: 'BlackBerry', data1: 1.7 },
                    { os: 'iOS', data1: 17.9 },
                    { os: 'Windows Phone', data1: 10.2 },
                    { os: 'Others', data1: 1.9 }
                ]
            });
            me.items = [{
                xtype: 'polar',
                theme: 'default-gradients',
                width: '100%',
                height: 500,
                store: me.myDataStore,
                insetPadding: 50,
                innerPadding: 20,
                legend: {
                    docked: 'bottom'
                },
                interactions: ['rotate', 'itemhighlight'],
                sprites: [
                {
                    type: 'text',
                    text: 'Data: IDC Predictions - 2017',
                    x: 12,
                    y: 425
                }, {
                    type: 'text',
                    text: 'Source: Internet',
                    x: 12,
                    y: 440
                }],
                series: [{
                    type: 'pie',
                    angleField: 'data1',
                    label: {
                        field: 'os',
                        calloutLine: {
                            length: 60,
                            width: 3
                            // specifying 'color' is also possible here
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data1') + '%');
                        }
                    }
                }]
            }];

            this.callParent();
        }
    });

    // Boiler Plate
    Ext.define('MyFiddle.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['Ext.layout.container.Accordion','MyFiddle.BasicPieChart'],
        alias: 'widget.main',
        layout: {
            type: 'box',
            activeOnTop: true
        },
        items: [{
            xtype: 'pie-basic'
        }]
    });
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
        border:	true,
        padding: 25,
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [{
                xtype: 'panel',
                padding: 10,
                border: false,
                bind: {
                    html: '{subheader}'
                }
            }],
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'main'
        }]
    });

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});
