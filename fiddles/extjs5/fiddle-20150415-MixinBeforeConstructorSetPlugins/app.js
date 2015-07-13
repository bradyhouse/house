var util = {
    log: function(msg) {
        document.body.innerHTML += '<div class="console">' + msg + '</div>';
    }
};
Ext.define('Fiddle.Mixin', {
    extend: 'Ext.Mixin',
    mixinConfig: {
        id: 'fiddlemixin',
        before: {
            constructor: 'onBeforeConstructor'
        }
    },
    onBeforeConstructor: function(config) {
        util.log('onBeforeConstructor');
        var me = this,
            config = config || me.config,
            clipBoardPlugin = {
                ptype: 'clipboard'
            };
        util.log('config:');
        util.log('' + JSON.stringify(config));
        if (config) {
            if (!config.plugins) {
                config.plugins = [clipBoardPlugin];
            } else {
                config.plugins.push(clipBoardPlugin);
            }
        }
        if (!me.selModel || me.selModel.type !== 'spreadsheet') {
            me.selModel = {
                type: 'spreadsheet',
                columnSelect: true,
                rowSelect: true
            };
        }
        util.log('&nbsp;');
    }
});
Ext.define('Fiddle.Grid', {
    extend: 'Ext.grid.Panel',
    listeners: {
        constructor: 'beforeConstructor'
    },
    requires: ['Fiddle.Mixin'],
    mixins: ['Fiddle.Mixin'],
    store: Ext.create('Ext.data.Store', {
        fields: ['A', 'B'],
        data: [{
            A: 100,
            B: 200
        }, {
            A: 3000,
            B: 5000
        }]
    }),
    config: {
        title: 'default title'
    },
    columns: [{
        dataIndex: 'A',
        text: 'A'
    }, {
        dataIndex: 'B',
        text: 'B'
    }],
    constructor: function(config) {
        config = config || this.config;
        util.log('grid > constructor');
        util.log('config:');
        util.log('' + JSON.stringify(config));
        this.callParent([config]);
        util.log('&nbsp;');
    }
});
Ext.onReady(function() {

    var fiddle1 = Ext.create('Fiddle.Grid', {
            itemId: 'grid1',
            title: 'override title'
        }),
        fiddle2 = Ext.create('Fiddle.Grid'),
        win1 = Ext.create('Ext.Window', {
            title: 'Grid 1 (config)',
            closable: false,
            height: 200,
            width: 200,
            layout: 'fit',
            items: fiddle1
        }),
        win2 = Ext.create('Ext.Window', {
            title: 'Grid 2 (no config)',
            closable: false,
            height: 200,
            width: 200,
            layout: 'fit',
            items: fiddle2
        }),
        unitTests = {
            pluginsContains: function(grid, type) {
                var plugin = grid.findPlugin(type);
                if (plugin) {
                    return true;
                }
                return false;
            },
            run: function(grid, testname) {
                var me = this;
                // Unit Tests
                try {
                    Ext.Assert.truthy(me.pluginsContains(grid, 'clipboard'), testname + ': plugins does not contain clipboard');
                    util.log(testname + ' - test passed');
                } catch (e) {
                    util.log(testname + ' ' + JSON.stringify(e));
                }
            }
        };

    win1.showAt([25, 0]);
    win2.showAt([25, 225]);

    // Test
    unitTests.run(fiddle1, "grid1");
    unitTests.run(fiddle2, "grid2");
});