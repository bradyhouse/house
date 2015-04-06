Ext.onReady(function () {

    Ext.QuickTips.init();


    var fiddleHeader = '2D versus 3D Pie Charts',
        fiddleSubHeader = '<i>Fiddle adapted from Sencha\'s <b>Chart Kitchen Sink\'s "Basic Pie Chart"</b> example. ' +
            'The second pie chart is identical to the first except for the series type attribute, which has been changed to the new <a href="http://docs-origin.sencha.com/extjs/5.1/5.1.0-apidocs/#!/api/Ext.chart.series.Pie3D" target="_blank">' +
            'pie3d</a> series type.  This series type was introduced in ExtJS 5.1.</i>',
        pieChartDataStore = Ext.create('Ext.data.JsonStore', {
            fields: ['os', 'data1' ],
            data: [
                { os: 'Android', data1: 68.3 },
                { os: 'BlackBerry', data1: 1.7 },
                { os: 'iOS', data1: 17.9 },
                { os: 'Windows Phone', data1: 10.2 },
                { os: 'Others', data1: 1.9 }
            ]
        }),
        pieChart2dPanel = Ext.create('Ext.Panel', {
            flex: 1,
            items: [
                {
                    xtype: 'polar',
                    theme: 'default-gradients',
                    width: '100%',
                    height: 500,
                    store: pieChartDataStore,
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
                                renderer: function (storeItem, item) {
                                    this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data1') + '%');
                                }
                            }
                        }
                    ]
                }
            ]
        }),
        pieChart3dPanel = Ext.create('Ext.Panel', {
            flex: 1,
            items: [
                {
                    xtype: 'polar',
                    theme: 'default-gradients',
                    width: '100%',
                    height: 500,
                    store: pieChartDataStore,
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
                                renderer: function (storeItem, item) {
                                    this.setHtml(storeItem.get('os') + ': ' + storeItem.get('data1') + '%');
                                }
                            }
                        }
                    ]
                }
            ]
        }),
        pieChart3dWin = Ext.create('Ext.Window', {
            title: 'Fiddle ~ 3D Pie Chart',
            height: 400,
            closable: false,
            width: 400,
            x: 501,
            layout: 'fit',
            items: pieChart3dPanel
        }),
        pieChart2dWin = Ext.create('Ext.Window', {
            title: 'Fiddle ~ 2D Pie Chart',
            height: 400,
            width: 400,
            x: 100,
            closable: false,
            layout: 'fit',
            items: pieChart2dPanel
        });

    pieChart2dWin.show();
    pieChart3dWin.show();

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
