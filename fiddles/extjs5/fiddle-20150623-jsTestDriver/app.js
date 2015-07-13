var meta = {
    fiddleHeader: 'Re-aligning Controls',
    fiddleSubHeader: 'Fiddle exploring how to move (re-align) a button relative to it\'s parent using the "setLocalX" method.' +
    '<br />'
};

Ext.define('Fiddle.Controls', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.fiddle-controls',
    title: null,
    width: '100%',
    layout: {
        type: 'hbox',
        align: 'right'
    },
    buttonAlign: 'right',
    items: [{
        xtype: 'button',
        itemId: 'targetBtn',
        text: 'BUTTON',
        enableToggle: true,
        margin: '0 0 0 5'
    },
        {
            xtype: 'datefield',
            itemId: 'startDate',
            fieldLabel: 'Start date',
            margin: '0 0 0 5'
        }, {
            xtype: 'datefield',
            itemId: 'endDate',
            fieldLabel: 'End date',
            margin: '0 0 0 5'
        }
    ]
});
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.Controls'
    ],
    layout: {
        type: 'vbox'
    },
    items: [{
        xtype: 'fiddle-controls'
    }, {
        xtype: 'panel',
        layout: {
            type: 'hbox'
        },
        items: [{
            xtype: 'button',
            itemId: 'hideDatesBtn',
            margin: '10 10 10 10',
            text: 'hide dates',
            handler: function () {
                Ext.ComponentQuery.query('#startDate')[0].hide();
                Ext.ComponentQuery.query('#endDate')[0].hide();
            }
        }, {
            xtype: 'button',
            itemId: 'showDatesBtn',
            margin: '10 10 10 10',
            text: 'show dates',
            handler: function () {
                Ext.ComponentQuery.query('#startDate')[0].show();
                Ext.ComponentQuery.query('#endDate')[0].show();
            }
        }, {
            xtype: 'button',
            itemId: 'realignBtn',
            margin: '10 10 10 10',
            text: 'Realign BUTTON',
            handler: function () {
                var btn = Ext.ComponentQuery.query('#targetBtn')[0],
                    btnBox = btn.getBox(),
                    btnWidth = btnBox.width,
                    panel = btn.up('panel'),
                    panelBox = panel.getBox(),
                    offsetX = panelBox.width - btnWidth;
                btn.setLocalX(offsetX);
            }
        }]
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
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 100;

    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
