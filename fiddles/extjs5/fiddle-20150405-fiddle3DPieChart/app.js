Ext.onReady(function () {

    Ext.QuickTips.init();


    var fiddleHeader = '2D versus 3D Pie Charts',
        fiddleSubHeader = '<i>Fiddle adapted from Sencha\'s <b>Chart Kitchen Sink\'s "Basic Pie Chart"</b> example. ' +
            'The second pie chart is identical to the first except for the series type attribute, which has been changed to the new <a href="http://docs-origin.sencha.com/extjs/5.1/5.1.0-apidocs/#!/api/Ext.chart.series.Pie3D" target="_blank">' +
            'pie3d</a> series type.  This series type was introduced in ExtJS 5.1.</i>',
        pieChartDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['os', 'data'],
            data: [
                {os: 'Android', data: 68.3},
                {os: 'BlackBerry', data: 1.7},
                {os: 'iOS', data: 17.9},
                {os: 'Windows Phone', data: 10.2},
                {os: 'Others', data: 1.9}
            ]
        }),
        pieChart2dPanel = Ext.create('Ext.Panel', {
            flex: 1,
            items: [
                {
                    xtype: 'polar',
                    theme: 'default-gradients',
                    width: '100%',
                    height: '100%',
                    store: pieChartDataStore,
                    insetPadding: 0,
                    innerPadding: 0,
                    legend: false,
                    interactions: ['rotate', 'itemhighlight'],
                    sprites: [
                        {
                            type: 'text',
                            text: 'Data: IDC Predictions - 2017',
                            x: 12,
                            y: 425
                        },
                        {
                            type: 'text',
                            text: 'Source: Internet',
                            x: 12,
                            y: 440
                        }
                    ],
                    series: [
                        {
                            type: 'pie',
                            angleField: 'data',
                            label: {
                                field: 'os',
                                calloutLine: {
                                    length: 60,
                                    width: 3
                                }
                            },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data') + '%');
                                }
                            }
                        }
                    ]
                }
            ]
        }),
        pieChart3dPanel = Ext.create('Ext.Panel', {
            flex: 1,
            requires: [
                'Ext.chart.series.sprite.Pie3DPart'
            ],
            items: [
                {
                    xtype: 'polar',
                    theme: 'default-gradients',
                    width: '100%',
                    height: '100%',
                    store: pieChartDataStore,
                    insetPadding: 10,
                    innerPadding: 20,
                    legend: false,
                    interactions: ['rotate', 'itemhighlight'],
                    sprites: [
                        {
                            type: 'text',
                            text: 'Data: IDC Predictions - 2017',
                            x: 12,
                            y: 425
                        },
                        {
                            type: 'text',
                            text: 'Source: Internet',
                            x: 12,
                            y: 440
                        }
                    ],
                    series: [
                        {
                            type: 'pie3d',
                            angleField: 'data',
                            label: {
                                field: 'os',
                                display: 'insideEnd',
                                orientation: 'horizontal'
                            },
                            highlight: true,
                            tooltip: {
                                trackMouse: true,
                                renderer: function (storeItem, item) {
                                    this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data') + '%');
                                }
                            }
                        }
                    ]
                }
            ]
        }),
        pieChart3dWin = Ext.create('Ext.Window', {
            id: 'win3d',
            title: 'Fiddle ~ 3D Pie Chart',
            height: 400,
            closable: false,
            width: 400,
            x: 501,
            maximizable: true,
            layout: 'fit',
            items: pieChart3dPanel
        }),
        pieChart2dWin = Ext.create('Ext.Window', {
            id: 'win2d',
            title: 'Fiddle ~ 2D Pie Chart',
            height: 400,
            width: 400,
            x: 100,
            maximizable: true,
            closable: false,
            layout: 'fit',
            items: pieChart2dPanel
        }),
        latitude = 25,
        latitudeOffset = 50,
        longitude = 150;

    pieChart2dWin.showAt([latitude, longitude]);
    pieChart3dWin.showAt([pieChart2dWin.getWidth() + latitudeOffset, longitude]);

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
