var meta = {
    fiddleHeader: 'Micro Gauges',
    fiddleSubHeader: 'Fiddle exploring the gauges charting control.  Specifically, to see how small they can be rendered-- pretty small.' +
    '<br />'
};


Ext.define('Fiddle.Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddle',

    onRefresh: function (bar, evt) {
        console.log('onRefresh');
        var r = Math.random,
            store = Ext.getStore('gauges');
        if (store) {
            store.setData([{
                mph: r() * 100,
                fuel: r() * 100,
                temp: r() * 250,
                rpm: r() * 8000
            }]);
        }
    },

    onAfterRender: function () {
        var me = this,
            gauges = me.getView().query('polar'),
            i, gauge,
            store;

        store = Ext.create('Ext.data.JsonStore', {
            storeId: 'gauges',
            fields: ['mph', 'fuel', 'temp', 'rpm', 'per'],
            data: [
                {mph: 65, fuel: 50, temp: 150, rpm: 6000}
            ]
        });

        for (i = 0; i < gauges.length; i++) {
            gauge = gauges[i];
            gauge.setStore(store);
        }
    },

    onFuelAxisLabelRender: function (axis, label, layoutContext) {
        if (label === 0) return 'E';
        if (label === 25) return '1/4';
        if (label === 50) return '1/2';
        if (label === 75) return '3/4';
        if (label === 100) return 'F';
        return ' ';
    },

    onTempAxisLabelRender: function (axis, label, layoutContext) {
        if (label === 0) return 'Cold';
        if (label === 125) return 'Comfortable';
        if (label === 250) return 'Hot';
        return ' ';
    },

    onRPMAxisLabelRender: function (axis, label, layoutContext) {
        return (label / 1000) + 'k';
    }

});


Ext.define('Fiddle.View', {
    extend: 'Ext.Panel',
    xtype: 'fiddle-view',
    controller: 'fiddle',


    tbar: [
        '->',
        {
            text: 'Refresh',
            handler: 'onRefresh'
        }
    ],

    items: [{
        xtype: 'panel',
        width: '100%',
        flex: 1,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
            {
                xtype: 'polar',
                height: 100,
                width: 100,
                insetPadding: 30,
                sprites: {
                    type: 'text',
                    text: 'Basic',
                    x: 30,
                    y: 30,
                    fontSize: 10
                },
                series: {
                    type: 'gauge',
                    angleField: 'mph',
                    needle: true,
                    donut: 30
                }
            },
            {
                xtype: 'polar',
                height: 120,
                width: 100,
                insetPadding: 30,
                padding: '0 0 0 10',
                sprites: [{
                    type: 'path',
                    path: 'm9.21399,0c-5.07404,0 -9.21399,3.43396 -9.21399,7.62198l0,80.2005l44.935,0.6257l0.05701,-46.8692l8.47498,0c1.94702,0 3.526,1.29001 3.526,2.901l0,35.32199c0,4.7373 5.383,8.87372 11.48999,8.87372c5.76801,0 12.172,-3.78342 12.172,-8.87372c-0.08801,-1.18399 -4.664,-22.23999 -4.664,-22.23999c0,-0.048 -0.96698,-5.91501 -0.96698,-5.91501l0,-26.90399c0,-2.88098 -1.16602,-5.258 -3.526,-7.224l-15.01703,-12.40002c-1.03198,0 -3.92395,2.38904 -3.92395,2.38904c0,0.867 7.45099,6.996 7.45099,6.996l-0.22803,10.46597c0,3.70001 3.63501,6.71201 8.13403,6.71201l2.04797,0l-0.73999,19.965l1.02399,6.88202l4.55103,20.19299c0.17596,3.28369 -3.45203,5.2327 -6.31403,5.2327c-2.64099,0 -5.745,-1.82098 -5.745,-4.15271l0.05701,-35.379c0,-4.30899 -4.25,-7.79199 -9.44202,-7.79199l-9.04401,0c0.63403,-0.03699 0.62604,-23.23599 0.62604,-28.15601l0,-0.853c0,-4.18802 -4.09802,-7.62198 -9.15802,-7.62198l-26.56299,0l0,0zm0,5.517l26.56299,0c1.41602,0 2.50299,0.94498 2.50299,2.10498l0,18.48599c0,1.172 -1.08698,2.048 -2.50299,2.048l-26.56299,0c-1.43103,0 -2.50201,-0.87601 -2.50201,-2.048l0,-18.48599c0,-1.16 1.07098,-2.10498 2.50201,-2.10498zm55.401,14.84598c0,0 2.25598,0.39001 2.78699,0.51202c1.09198,0.23196 1.79102,1.59097 1.82001,2.78699c0.02997,1.20901 0,4.83499 0,4.83499c-3.34802,-0.61099 -4.60699,-2.03799 -4.60699,-3.35602l0,-4.77798z',
                    fillStyle: 'rgb(92, 158, 22)',
                    strokeStyle: 'none',
                    scale: {
                        x: 0.25,
                        y: 0.25
                    },
                    translate: {
                        x: 112,
                        y: 130
                    }
                }],
                axes: {
                    title: {
                        text: 'Fuel',
                        fontSize: 10
                    },
                    label: {
                        fontSize: 8
                    },
                    type: 'numeric',
                    position: 'gauge',
                    majorTickSteps: 4,
                    renderer: 'onFuelAxisLabelRender'
                },
                series: {
                    type: 'gauge',
                    angleField: 'fuel',
                    fontSize: 10,
                    donut: 50
                }
            }
        ]
    }, {
        xtype: 'panel',
        width: '100%',
        flex: 1,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
            {
                xtype: 'polar',
                height: 130,
                width: 100,
                padding: '10 0 0 0',
                insetPadding: 30,
                axes: {
                    title: {
                        text: 'Temp',
                        fontSize: 10
                    },
                    label: {
                        fontSize: 8
                    },
                    type: 'numeric',
                    position: 'gauge',
                    maximum: 250,
                    majorTickSteps: 2,
                    renderer: 'onTempAxisLabelRender'
                },
                series: {
                    type: 'gauge',
                    angleField: 'temp',
                    donut: 50
                }
            },
            {
                xtype: 'polar',
                height: 120,
                width: 100,
                padding: '10 0 0 10',
                insetPadding: 30,
                axes: {
                    title: {
                        text: 'RPM',
                        fontSize: 10
                    },
                    label: {
                        fontSize: 8
                    },
                    type: 'numeric',
                    position: 'gauge',
                    maximum: 8000,
                    majorTickSteps: 8,
                    renderer: 'onRPMAxisLabelRender'
                },
                series: {
                    type: 'gauge',
                    angleField: 'rpm',
                    donut: 30,
                    needle: true
                }
            }
        ]
    }, {
        xtype: 'panel',
        width: '100%',
        flex: 1,
        layout: {
            type: 'hbox',
            pack: 'center'
        },
        items: [
            {
                xtype: 'polar',
                height: 130,
                width: 100,
                padding: '10 0 0 0',
                insetPadding: 30,
                axes: {
                    title: {
                        text: 'Percentage',
                        fontSize: 10
                    },
                    label: {
                        fontSize: 8
                    },
                    type: 'numeric',
                    position: 'gauge',
                    maximum: 250,
                    majorTickSteps: 2,
                    renderer: 'onTempAxisLabelRender'
                },
                series: {
                    type: 'gauge',
                    angleField: 'temp',
                    donut: 50
                }
            },
            {
                xtype: 'polar',
                height: 120,
                width: 100,
                padding: '10 0 0 10',
                insetPadding: 30,
                axes: {
                    title: {
                        text: 'RPM',
                        fontSize: 10
                    },
                    label: {
                        fontSize: 8
                    },
                    type: 'numeric',
                    position: 'gauge',
                    maximum: 8000,
                    majorTickSteps: 8,
                    renderer: 'onRPMAxisLabelRender'
                },
                series: {
                    type: 'gauge',
                    angleField: 'rpm',
                    donut: 30,
                    needle: true
                }
            }
        ]
    }],

    listeners: {
        afterrender: 'onAfterRender'
    }
});

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
