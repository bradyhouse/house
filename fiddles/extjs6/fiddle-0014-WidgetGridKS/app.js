var meta = {
    fiddleHeader: 'Widget Grid Kitchen Sink',
    fiddleSubHeader: 'Fiddle lifted from the Kitchen Sink - Widget Grid.' +
    '<br />'
};

var fiddleStore = null;


Ext.define('Fiddle.Model', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name'},
        {name: 'progress', type: 'float'},
        'sequence1',
        'sequence2',
        'sequence3',
        'sequence4',
        'sequence5',
        'sequence6',
        'sequence7'
    ]
});
Ext.define('Fiddle.Store', {
    extend: 'Ext.data.Store',
    model: 'Fiddle.Model',
    data: (function() {
        var result = [],
            i,
            generateSequence = function(count, min, max) {
                var j,
                    sequence = [];
                if (count == null) {
                    count = 20;
                }
                if (min == null) {
                    min = -10;
                }
                if (max == null) {
                    max = 10;
                }
                for (j = 0; j < count; j++) {
                    sequence.push(Ext.Number.randomInt(min, max));
                }
                return sequence;
            };
        for (i = 0; i < 8; i++) {
            result.push([i + 1, 'Record ' + (i + 1), Ext.Number.randomInt(0, 100) / 100, generateSequence(), generateSequence(), generateSequence(), generateSequence(20, 1, 10), generateSequence(4, 10, 20), generateSequence(), generateSequence(20, -1, 1)]);
        }
        return result;
    })()
}, function () {
    fiddleStore = Ext.create('Fiddle.Store', {
        storeId: 'myStore'
    });
});
Ext.define('Fiddle.View', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Ext.grid.column.Action',
        'Ext.ProgressBarWidget',
        'Ext.slider.Widget',
        'Ext.sparkline.*'
    ],
    xtype: 'fiddle',
    store: fiddleStore,
    height: 350,
    width: 1050,
    title: null,
    viewConfig: {
        stripeRows: true,
        enableTextSelection: false,
        markDirty: false
    },
    trackMouseOver: false,
    disableSelection: true,
    initComponent: function () {
        var me = this;
        me.columns = [{
            text: 'Button',
            width: 105,
            xtype: 'widgetcolumn',
            dataIndex: 'progress',
            widget: {
                width: 90,
                textAlign: 'left',
                xtype: 'splitbutton',
                iconCls: 'widget-grid-user',
                handler: function(btn) {
                    var rec = btn.getWidgetRecord();
                    Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
                }
            }
        }, {
            text     : 'Progress',
            xtype    : 'widgetcolumn',
            width    : 120,
            dataIndex: 'progress',
            widget: {
                xtype: 'progressbarwidget',
                textTpl: [
                    '{percent:number("0")}% done'
                ]
            }
        },
            {
                text: 'Run Mode',
                width: 150,
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'combo',
                    store: [
                        'Local',
                        'Remote'
                    ]
                }
            },
            {
                text     : 'Slider',
                xtype    : 'widgetcolumn',
                width    : 120,
                dataIndex: 'progress',
                widget: {
                    xtype: 'sliderwidget',
                    minValue: 0,
                    maxValue: 1,
                    decimalPrecision: 2,
                    listeners: {
                        change: function(slider, value) {
                            // If the widget has been decorated by the WidgetColumn with context-returning methods
                            // then extract data and update its context record.
                            if (slider.getWidgetRecord) {
                                var rec = slider.getWidgetRecord();
                                if (rec) {
                                    rec.set('progress', value);
                                }
                            }
                        }
                    }
                }
            }, {
                text: 'Line',
                width: 100,
                dataIndex: 'sequence1',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklineline',
                    tipTpl: 'Value: {y:number("0.00")}'
                }
            }, {
                text: 'Bar',
                width: 100,
                dataIndex: 'sequence2',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinebar'
                }
            }, {
                text: 'Discrete',
                width: 100,
                dataIndex: 'sequence3',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinediscrete'
                }
            }, {
                text: 'Bullet',
                width: 100,
                dataIndex: 'sequence4',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinebullet'
                }
            }, {
                text: 'Pie',
                width: 60,
                dataIndex: 'sequence5',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinepie'
                }
            }, {
                text: 'Box',
                width: 100,
                dataIndex: 'sequence6',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinebox'
                }
            }, {
                text: 'TriState',
                width: 100,
                dataIndex: 'sequence7',
                xtype: 'widgetcolumn',
                widget: {
                    xtype: 'sparklinetristate'
                }
            }];
        me.tbar = [];
        for (var i = 0; i < me.columns.length; i++) {
            me.tbar.push({
                text: me.columns[i].text,
                enableToggle: true,
                pressed: true,
                scope: me,
                toggleHandler: me.onButtonToggle
            });
        }
        me.callParent();
        me.on({
            columnshow: me.onColumnToggle,
            columnhide: me.onColumnToggle
        });
    },
    onButtonToggle: function(btn, pressed) {
        if (this.processing) {
            return;
        }
        this.processing = true;
        var header = this.headerCt.child('[text=' + btn.text + ']');
        header.setVisible(pressed);
        this.processing = false;
    },
    onColumnToggle: function(headerCt, header) {
        if (this.processing) {
            return;
        }
        this.processing = true;
        var btn = this.down('toolbar').child('[text=' + header.text + ']');
        btn.setPressed(header.isVisible());
        this.processing = false;
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
