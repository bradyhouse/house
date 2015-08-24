var meta = {
    fiddleHeader: 'Dow Jones Industrial Average',
    fiddleSubHeader: 'Fiddle exploring how to plot the Dow Jones Industrial Average using an ExtJS chart. The data for the chart is populated using a jsonp AJAX call to Yahoo\'s financial chart API.' +
    '<br />',
    urls: {
        dji5day: 'https://chartapi.finance.yahoo.com/instrument/1.0/%5EDJI/chartdata;type=quote;range=5d/json/'
    }
};

// Statics
Ext.define('Fiddle.Statics', {
    statics: {
        convertToDate: function(yyyymmdd) {
            var rawdate = yyyymmdd.toString(),
                year = parseInt(rawdate.substr(0,4)),
                monthStr = rawdate.substr(4,2),
                month = monthStr.charAt(0) === '0' ? parseInt(monthStr.charAt(1)) - 1 : parseInt(monthStr) - 1,
                dayStr = rawdate.substr(6,2),
                day = dayStr.charAt(0) === '0' ? parseInt(dayStr.charAt(1)) : parseInt(dayStr),
                date = new Date();
            date.setYear(year);
            date.setMonth(month);
            date.setDate(day);
            return date;
        }
    }
});

// Models
Ext.define('Fiddle.model.BusinessDate', {
    extend: 'Ext.data.Model',
    uses: [
        'Fiddle.Statics'
    ],
    fields: [{
        name: 'id',
        mapping: 'date'
    }, {
        name: 'displayBusDate',
        convert: function(value, record) {
            var date = Fiddle.Statics.convertToDate(record.get('id'));
            return Ext.Date.format(date, 'm/d/Y');
        }
    },
        {
            name: 'seriesId',
            convert: function(value, record) {
                var date = Fiddle.Statics.convertToDate(record.get('id'));
                return Ext.Date.format(date, 'Ymd');
            }
        }]
});
Ext.define('Fiddle.model.Series', {
    extend: 'Ext.data.Model',
    uses: [
        'Fiddle.Statics'
    ],
    fields: [{
        name: 'Timestamp',
        mapping: 'Timestamp'
    }, {
        name: 'close',
        mapping: 'close'
    }, {
        name: 'high',
        mapping: 'high'
    }, {
        name: 'low',
        mapping: 'low'
    }, {
        name: 'open',
        mapping: 'open'
    }, {
        name: 'volume',
        mapping: 'volume'
    }, {
        name: 'localTime',
        convert: function (value, record) {
            var timestamp = record.data.Timestamp,
                date = new Date(timestamp * 1000);
            return Ext.Date.format(date, 'H:i');
        }
    }, {
        name: 'shortTime',
        convert: function (value, record) {
            var timestamp = record.data.Timestamp,
                date = new Date(timestamp * 1000);
            return Ext.Date.format(date, 'g:i A');
        }
    }, {
        name: 'displayBusDate',
        convert: function (value, record) {
            var timestamp = record.data.Timestamp,
                date = new Date(timestamp * 1000);
            return Ext.Date.format(date, 'm/d/Y');
        }
    }, {
        name: 'displayTimeStamp',
        convert: function (value, record) {
            var timestamp = record.data.Timestamp,
                date = new Date(timestamp * 1000);
            return Ext.Date.format(date, 'H:i');
        }
    }, {
        name: 'seriesId',
        convert: function (value, record) {
            var timestamp = record.data.Timestamp,
                date = new Date(timestamp * 1000);
            return Ext.Date.format(date, 'Ymd');
        }
    }
    ]
});

// Store Filter
Ext.define('Fiddle.store.BusinessDateFilter', {
    extend: 'Ext.util.Filter',
    config: {
        businessDate: null,
        filterFn: function(model) {
            return this.getBusinessDate() === model.get('seriesId');
        },
        id: 'businessDateFilter'
    }
});

// Stores
Ext.define('Fiddle.store.Series', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.Series',
        'Fiddle.store.BusinessDateFilter'
    ],
    config: {
        autoDestroy: true,
        proxy: {
            type: 'jsonp',
            url: meta.urls.dji5day,
            reader: {
                rootProperty: 'series'
            }

        },
        model: 'Fiddle.model.Series',
        autoLoad: true
    },
    addBusinessDateFilter: function(id) {
        if (this.isFiltered()) {
            this.removeFilter('businessDateFilter');
        }
        this.addFilter(new Fiddle.store.BusinessDateFilter({
            businessDate: id
        }));
    }
}, function () {
    Ext.create('Fiddle.store.Series', {
        storeId: 'series'
    });
});
Ext.define('Fiddle.store.BusinessDates', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.model.BusinessDate'
    ],
    config: {
        autoDestroy: true,
        proxy: {
            type: 'jsonp',
            url: meta.urls.dji5day,
            reader: {
                rootProperty: 'TimeStamp-Ranges'
            }
        },
        model: 'Fiddle.model.BusinessDate',
        autoLoad: true
    }
}, function(){
    Ext.create('Fiddle.store.BusinessDates', {
        storeId: 'businessdates'
    });
});

// Business Date Selector
Ext.define('Fiddle.view.BusinessDate', {
    extend: 'Ext.form.field.ComboBox',
    requires: [
        'Fiddle.store.BusinessDates'
    ],
    alias: 'widget.businessdate',
    config: {
        queryMode: 'local',
        reference: 'businessdate',
        fieldLabel: 'Business Date:',
        editable: false,
        displayField: 'displayBusDate',
        valueField: 'seriesId',
        listeners: {
            change: 'onBusinessDateChange',
            setvalue: 'onBusinessDateSetValue'
        }
    },
    initComponent: function() {
        var me = this;
        me.store = Ext.getStore('businessdates');
        me.callParent(arguments);
        window.setTimeout(function() {
            me.fireEvent('setvalue', me);
        }, 1000);
    }
});

// CandleStick Chart
Ext.define('Fiddle.view.CandleStickChart', {
    extend: 'Ext.Panel',
    xtype: 'candlestickchart',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight',
        'Fiddle.view.BusinessDate'
    ],
    layout: {
        type: 'fit',
        align: 'stretch',
        width: '100%',
        height: '70%'
    },
    tbar: [
        '->', {
            xtype: 'businessdate'
        },
        {
            xtype: 'segmentedbutton',
            defaults: {
                ui: 'default-toolbar'
            },
            items: [
                {
                    text: 'Zoom',
                    pressed: true
                }, {
                    text: 'Pan'
                }

            ],
            listeners: {
                toggle: 'onModeToggle'
            }
        },
        {
            text: 'Reset pan/zoom',
            handler: 'onPanZoomReset'
        }
    ],
    items: [{
        xtype: 'cartesian',
        background: '#000',
        reference: 'cschart',
        layout: 'fit',
        innerPadding: {
            top: 20,
            left: 10,
            right: 10,
            bottom: 20
        },
        width: '100%',
        store: Ext.getStore('series'),
        interactions: [
            {
                type: 'panzoom',
                enabled: false,
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
                type: 'crosszoom'
            }
        ],
        sprites: [
            {
                type: 'text',
                text: 'DJI ~ Open / Close / High / Low',
                fontWeight: 'bold',
                fillStyle: '#FFF',
                fontSize: 14,
                width: 100,
                height: 30,
                x: 80, // the sprite x position
                y: 40  // the sprite y position
            }
        ],
        series: [
            {
                type: 'candlestick',
                xField: 'localTime',
                openField: 'open',
                highField: 'high',
                lowField: 'low',
                closeField: 'close',
                style: {
                    dropStyle: {
                        fill: 'red',
                        stroke: 'red',
                        lineWidth: 3,
                        opacity: '.9'
                    },
                    raiseStyle: {
                        fill: 'lime',
                        stroke: 'lime',
                        lineWidth: 3,
                        opacity: '.9'
                    }
                },
                tooltip: {
                    trackMouse: true,
                    closable: false,
                    shadow: 'drop',
                    style: {
                        opacity: 0.8
                    },
                    padding: '0 10 5 0',
                    renderer: function (tooltip, model) {
                        var html = '<table width="100%">' +
                            '<tr><td>Business Date:&nbsp;</td><td>' + model.get('displayBusDate') + '</td></tr>' +
                            '<tr><td>Time Stamp:&nbsp;</td><td>' + model.get('displayTimeStamp') + '</td></tr>' +
                            '<tr><td>Open:&nbsp;</td><td>' + Ext.util.Format.number(model.get('open'), '0.00') + '</td></tr>' +
                            '<tr><td>Low:&nbsp;</td><td>' + Ext.util.Format.number(model.get('low'), '0.00') + '</td></tr>' +
                            '<tr><td>High:&nbsp;</td><td>' + Ext.util.Format.number(model.get('high'), '0.00') + '</td></tr>' +
                            '<tr><td>Close:&nbsp;</td><td>' + Ext.util.Format.number(model.get('close'), '0.00') + '</td></tr>' +
                            '<tr><td>Volume:&nbsp;</td><td>' + model.get('volume') + '</td></tr>' +
                            '</table>';
                        tooltip.setHtml(html);
                    }
                },
                listeners: {
                    itemmouseover: function(series, item) {
                        console.log('onItemMouseOver');
                    }
                }
            }
        ],
        axes: [
            {
                type: 'numeric',
                fields: ['open', 'high', 'low', 'close', 'volume'],
                position: 'left',
                label: {
                    fontSize: 10,
                    fillStyle: '#00FF00'
                },
                grid: {
                    stroke: '#00FF00',
                    opacity: '.5'
                }
            },
            {
                type: 'category',
                fields: ['localTime'],
                position: 'bottom',
                grid: {
                    stroke: '#FFFF00',
                    opacity: '.6'
                },
                visibleRange: [0.1, 1],
                label: {
                    fontSize: 10,
                    fillStyle: '#FFFF00'
                }
            }
        ]
    }]
});

// Area Chart
Ext.define('Fiddle.view.AreaChart', {
    extend: 'Ext.panel.Panel',
    xtype: 'areachart',
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Line',
        'Ext.chart.axis.Numeric',
        'Ext.draw.modifier.Highlight',
        'Ext.chart.axis.Time',
        'Ext.chart.interactions.ItemHighlight'
    ],
    layout: {
        type: 'fit',
        align: 'stretch',
        width: '100%',
        height: '20%'
    },
    items: [{
        xtype: 'cartesian',
        reference: 'areachart',
        layout: 'fit',
        background: '#000',
        innerPadding: {
            top: 20,
            left: 10,
            right: 10,
            bottom: 20
        },
        width: '100%',
        store: Ext.getStore('series'),
        sprites: [{
            type: 'text',
            text: 'DJI ~ Volume',
            fillStyle: '#FFF',
            fontWeight: 'bold',
            fontSize: 14,
            width: 100,
            height: 30,
            zIndex: 1000,
            x: 80, // the sprite x position
            y: 35  // the sprite y position
        }],
        interactions: [
            {
                type: 'panzoom',
                enabled: false,
                zoomOnPanGesture: false,
                axes: {
                    left: {
                        allowPan: false,
                        allowZoom: false
                    },
                    bottom: {
                        allowPan: true,
                        allowZoom: true
                    }
                }
            },
            {
                type: 'crosszoom'
            }
        ],
        series: [{
            type: 'line',
            xField: 'localTime',
            yField: 'volume',
            style: {
                lineWidth: 4,
                fillStyle: 'magenta',
                strokeStyle: 'magenta'
            },
            highlight: {
                fillStyle: 'rgb(222, 87, 87)',
                radius: 5,
                lineWidth: 2,
                strokeStyle: 'rgb(222, 87, 87)'
            },
            marker: {
                radius: 1
            },
            tooltip: {
                trackMouse: true,
                closable: false,
                shadow: 'drop',
                style: {
                    opacity: 0.8
                },
                padding: '0 10 5 0',
                renderer: function (tooltip, model) {
                    var html = '<table width="100%">' +
                        '<tr><td>Business Date:&nbsp;</td><td>' + model.get('displayBusDate') + '</td></tr>' +
                        '<tr><td>Time Stamp:&nbsp;</td><td>' + model.get('displayTimeStamp') + '</td></tr>' +
                        '<tr><td>Open:&nbsp;</td><td>' + Ext.util.Format.number(model.get('open'), '0.00') + '</td></tr>' +
                        '<tr><td>Low:&nbsp;</td><td>' + Ext.util.Format.number(model.get('low'), '0.00') + '</td></tr>' +
                        '<tr><td>High:&nbsp;</td><td>' + Ext.util.Format.number(model.get('high'), '0.00') + '</td></tr>' +
                        '<tr><td>Close:&nbsp;</td><td>' + Ext.util.Format.number(model.get('close'), '0.00') + '</td></tr>' +
                        '<tr><td>Volume:&nbsp;</td><td>' + model.get('volume') + '</td></tr>' +
                        '</table>';
                    tooltip.setHtml(html);
                }
            }
        }],
        axes: [
            {
                type: 'numeric',
                fields: ['volume'],
                position: 'left',
                label: {
                    align: 'left',
                    fontSize: 10,
                    fillStyle: '#00FF00'
                },
                grid: {
                    stroke: '#00FF00',
                    opacity: '.5'
                },
                renderer: function (axis, data) {
                    var value = data / 1000000;
                    return value.toFixed(1) + ' M';
                }
            }, {
                type: 'category',
                fields: ['localTime'],
                position: 'bottom',
                grid: {
                    stroke: '#FFFF00',
                    opacity: '.6'
                },
                visibleRange: [0.1, 1],
                label: {
                    fontSize: 10,
                    fillStyle: '#FFFF00'
                }
            }
        ]
    }]
});

// Main Panel
Ext.define('Fiddle.view.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
    onModeToggle: function (segmentedButton, button, pressed) {
        var cschart = this.lookupReference('cschart'),
            achart = this.lookupReference('areachart');

        this.updateChartInteractions(cschart, button);
        this.updateChartInteractions(achart, button);
    },
    onPanZoomReset: function () {
        var cschart = this.lookupReference('cschart'),
            achart = this.lookupReference('areachart'),
            csaxes = cschart.getAxes(),
            aaxes = achart.getAxes();
        csaxes[0].setVisibleRange([0, 1]);
        csaxes[1].setVisibleRange([0, 1]);
        cschart.redraw();
        aaxes[0].setVisibleRange([0, 1]);
        aaxes[1].setVisibleRange([0, 1]);
        achart.redraw();
    },
    onBusinessDateSetValue: function(field) {
        var dateStr = field.getStore().last().get('seriesId');
        field.setValue(dateStr);
    },
    onBusinessDateChange: function(field, newValue, oldValue) {
        var store = Ext.getStore('series');
        store.addBusinessDateFilter(newValue);
    },
    privates: {
        updateChartInteractions: function(chart, button) {
            var interactions = chart.getInteractions(),
                pan = interactions[0],
                crosszoom = interactions[1];
            pan.setEnabled(button.getText() === "Pan");
            crosszoom.setEnabled(button.getText() === "Zoom");
        }
    }
});
Ext.define('Fiddle.view.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.view.MainController'
    ],
    controller: 'main',
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'candlestickchart'
    }, {
        xtype: 'splitter',
        style: {
            backgroundColor: 'lightGray'
        },
        height: '2px'
    }, {
        xtype: 'areachart'
    }]
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
    var fiddle = Ext.create('Fiddle.view.Main'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle,
            listeners: {
                resize: function (win) {
                    var wBox = win.getBox(),
                        candleStickChart = win.down('candlestickchart'),
                        areaChart = win.down('areachart'),
                        csBox = candleStickChart.getBox(),
                        aBox = areaChart.getBox();
                    csBox.height = .8 * (wBox.height - 40);
                    csBox.width = wBox.width - 10;
                    candleStickChart.setBox(csBox);
                    aBox.height = .2 * (wBox.height - 40);
                    aBox.width = wBox.width - 10;
                    areaChart.setBox(aBox);
                }
            }
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
