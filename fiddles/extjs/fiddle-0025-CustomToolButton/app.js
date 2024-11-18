var meta = {
    fiddleHeader: 'Custom Toolbar button',
    fiddleSubHeader: 'Fiddle exploring how (and if) a custom tool can be created in which the tooltips have been disabled.' +
        '<br />'
};


Ext.define('Overrides.panel.Tool', {
    override: 'Ext.panel.Tool',
    privates: {
        onMouseOver: function() {
            var panel = this.up('panel'),
                container = panel ? panel.up('panel') : null,
                lastPanel = container ? container.items.last() : null;
            if (lastPanel && lastPanel.id == panel.id && panel.collapsed) {
                this.el.dom.removeAttribute('data-qtip');
            }
            if (this.disabled) {
                return false;
            }
            this.el.addCls(this.toolOverCls);
        }
    }
});


Ext.define('Fiddle.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dummypanel',
    collapsible: true,
    tools: [{
        type: 'restore',
        tooltip: 'restore'
    }],
    height: 200,
    html: ''
});


Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.Panel'
    ],
    constructor() {
        var config = {};
        config.items = this.buildItems();
        config.scrollable = true;
        this.callParent([config]);
    },
    privates: {
        buildItems: function() {
            var i = 1,
                items = [];
            for (; i <= 10; i++) {
                items.push({
                    xtype: 'dummypanel',
                    title: i == 10 ? 'MouseOver the tool buttons =>' : null,
                    collapsed: i > 3 ? true : false,
                });
            }
            return items;
        }
    }
});
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
    }]
});
Ext.onReady(function() {
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
    window.setTimeout(function() {
        win.maximize(true);
    }, 2500);
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
