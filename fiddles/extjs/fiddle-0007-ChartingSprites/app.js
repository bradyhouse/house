var meta = {
    fiddleHeader: 'Charting Sprites',
    fiddleSubHeader: 'Fiddle exploring how to add a pseudo axis at Y=0 in a column chart using a line sprite.' +
    ' Note, this is fake data. It was <i>fat fingered</i> using <a href="http://www.json-generator.com/" target="_blank">json-generator.com</a>' +
    '<br />',
    dataUrl: 'data.json',
    colors: {
        yellow: '#E9F90B',
        red: '#F91B0B',
        lightblue: '#0BC1F9',
        blue: '#0B0BF9'
    }
};


Ext.define('Fiddle.Records', {
    extend: 'Ext.data.Store',
    config: {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: meta.dataUrl,
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: '_id',
                totalProperty: 'total'
            }
        },
        remoteSort: false,
        sortInfo: {
            field: 'name',
            direction: 'DESC'
        },
        pageSize: 50,
        fields: ['_id', 'index', 'isActive', 'checking', 'savings', 'picture', 'age', 'eyeColor', 'name', 'gender', 'company', 'email', 'address', 'about', 'latitude', 'longitude'],
        autoLoad: true
    }
}, function () {
    Ext.create('Fiddle.Records', {
        storeId: 'records'
    });
    Ext.create('Ext.data.ChainedStore', {
        source: 'records',
        storeId: 'viewrecords'
    });
});

Ext.define('Fiddle.ChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.fiddlechart',
    onModeToggle: function (segmentedButton, button, pressed) {
        var chart = this.lookupReference('chart'),
            interactions = chart.getInteractions(),
            panzoom = interactions[0],
            crosshair = interactions[1],
            value = segmentedButton.getValue(),
            isCrosshair = value === 0;

        crosshair.setEnabled(isCrosshair);
        panzoom.setEnabled(!isCrosshair);
        panzoom.setZoomOnPanGesture(value === 2);
    },
    onPanZoomReset: function () {
        var chart = this.lookupReference('chart'),
            axes = chart.getAxes();
        axes[0].setVisibleRange([0, 1]);
        axes[1].setVisibleRange([0, 0.3]);
        chart.redraw();
    },
    onPreview: function () {
        var chart = this.lookupReference('chart');
        chart.preview();
    },
    onDownload: function () {
        var chart = this.lookupReference('chart');

        if (Ext.os.is.Desktop) {
            chart.download({
                filename: 'bar-chart-art'
            });
        } else {
            chart.preview();
        }
    }
});
Ext.define('Fiddle.Chart', {
    extend: 'Ext.Panel',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],
    controller: 'fiddlechart',
    layout: 'fit',
    tbar: [
        '->',
        {
            xtype: 'segmentedbutton',
            width: 270,
            defaults: {
                ui: 'default-toolbar'
            },
            items: [
                {
                    text: 'Crosshair'
                },
                {
                    text: 'Pan',
                    pressed: true
                },
                {
                    text: 'Zoom'
                }
            ],
            listeners: {
                toggle: 'onModeToggle'
            }
        },
        {
            text: 'Reset pan/zoom',
            handler: 'onPanZoomReset'
        },
        {
            text: Ext.os.is.Desktop ? 'Download' : 'Preview',
            handler: 'onDownload'
        }
    ],
    items: {
        xtype: 'cartesian',
        reference: 'chart',
        store: new Fiddle.Records(),
        animation: true,
        shadow: true,
        plugins: {
            ptype: 'chartitemevents',
            moveEvents: true
        },
        interactions: [
            {
                type: 'panzoom',
                enabled: true,
                zoomOnPanGesture: false,
                axes: {
                    left: {
                        allowPan: true,
                        allowZoom: true
                    },
                    bottom: {
                        allowPan: true,
                        allowZoom: true
                    }
                }
            },
            {
                type: 'crosshair',
                axes: {
                    label: {
                        fillStyle: 'white'
                    },
                    rect: {
                        fillStyle: '#344459',
                        opacity: 0.7,
                        radius: 5
                    }
                }
            }
        ],
        innerPadding: {
            top: 20,
            left: 0,
            right: 0,
            bottom: 20
        },
        axes: [{
            type: 'numeric',
            position: 'left',
            fields: ['savings', 'checking'],
            increment: 100000,
            grid: {
                odd: {
                    opacity: .5,
                    fill: '#ddd',
                    stroke: '#bbb',
                    lineWidth: 1
                }
            },
            title: 'Account Balance ($)'
        }, {
            type: 'category',
            position: 'bottom',
            fields: 'index',
            grid: true,
            title: 'Customer (#)',
            visibleRange: [0, 0.1]

        }],
        series: [

            {
                type: 'bar',
                stacked: true,
                xField: 'index',
                colors: ['skyblue', 'blue'],
                yField: ['savings', 'checking'],
                highlightCfg: {
                    strokeStyle: 'magenta',
                    lineWidth: 3
                },
                tooltip: {
                    trackMouse: true,
                    closable: false,
                    shadow: 'drop',
                    style: {
                        backgroundColor: 'turquoise',
                        opacity: 0.8
                    },
                    padding: '0 10 5 0',
                    renderer: function (tooltip, model) {
                        var html = '<table width="100%">' +
                            '<tr><td>Name:&nbsp;</td><td>' + model.get('name') + '</td></tr>' +
                            '<tr><td>Savings:&nbsp;</td><td>' + Ext.util.Format.currency(model.get('savings'), null, 2) + '</td></tr>' +
                            '<tr><td>Checking:&nbsp;</td><td>' + Ext.util.Format.currency(model.get('checking'), null, 2) + '</td></tr>' +
                            '</table>';
                        tooltip.setHtml(html);
                    }
                },

                renderer: function (sprite, config, rendererData, index) {
                    var surface = sprite.getSurface(),
                        changes = {},
                        lineSprites;
                    if (index == 0) {
                        lineSprites = surface.myLineSprites;
                        if (!lineSprites) {
                            lineSprites = surface.myLineSprites = [];
                            lineSprites[0] = surface.add({type: 'path'});
                        }
                        var x1 = 0,
                            y1 = config.y + config.height,
                            x2 = surface.getRect()[2],
                            y2 = y1;
                        lineSprites[0].setAttributes({
                            lineWidth: 4,
                            strokeStyle: '#00FF00',
                            zIndex: 10000,
                            opacity: 0.7,
                            path: "M" + x1 + " " + y1 + " L" + x2 + " " + y2 + " Z"
                        });
                    }
                    return changes;
                }

            }],
        legend: {
            hidden: false
        }
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
    var fiddle = Ext.create('Fiddle.Chart'),
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
    Ext.QuickTips.init();
    win.showAt([positionX, positionY]);
    window.setTimeout(function () {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
