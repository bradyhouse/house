Ext.onReady(function () {

    Ext.define('SimpleFilter.model.Animal', {
        extend: 'Ext.data.TreeModel',
        entityName: 'Animal',
        idProperty: 'animalid',
        fields: [{
            name: "title",
            convert: undefined
        }]
    });
    Ext.define('SimpleFilter.store.Animals', {
        extend: 'Ext.data.TreeStore',
        model: 'SimpleFilter.model.Animal',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'Animals.json'
        },
        autoload: true
    });
    Ext.define('SimpleFilter.tree.Animals', {
        extend: 'Ext.tree.Panel',
        xtype: 'tree-animals',
        store: 'Animals',
        rootVisible: false,
        collapseFirst: false,
        frame: true,
        title: 'Animal Tree',
        width: 650,
        height: 400,
        reserveScrollbar: true,
        useArrows: true,
        columns: [{
            xtype: 'treecolumn',
            text: 'Animal',
            flex: 2.5,
            sortable: true,
            dataIndex: 'title'
        }, {
            text: 'Id',
            flex: 1,
            dataIndex: 'animalid',
            sortable: true
        }],
        tbar: [{
            labelWidth: 130,
            xtype: 'triggerfield',
            fieldLabel: 'Filter',
            triggerCls: 'x-form-clear-trigger',
            onTriggerClick: function () {
                var store = this.up('treepanel').store;

                this.reset();
                store.clearFilter();
                this.focus();
            },
            listeners: {
                change: function () {
                    var tree = this.up('treepanel'),
                        v,
                        matches = 0;

                    try {
                        v = new RegExp(this.getValue(), 'i');
                        tree.store.filter({
                            filterFn: function (node) {
                                var children = node.childNodes,
                                    len = children && children.length,
                                    visible = node.isLeaf() ? v.test(node.get('title')) : false,
                                    i;
                                for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                                if (visible && node.isLeaf()) {
                                    matches++;
                                }
                                return visible;
                            },
                            id: 'titleFilter'
                        });
                        tree.down('#matches').setValue(matches);
                    } catch (e) {
                        this.markInvalid('Invalid regular expression');
                    }
                },
                buffer: 250
            }
        }, {
            xtype: 'displayfield',
            itemId: 'matches',
            fieldLabel: 'Matches',

            // Use shrinkwrap width for the label
            labelWidth: null,
            listeners: {
                beforerender: function () {
                    var me = this,
                        tree = me.up('treepanel'),
                        root = tree.getRootNode(),
                        leafCount = 0;

                    tree.store.on('fillcomplete', function (store, node) {
                        if (node === root) {
                            root.visitPostOrder('', function (node) {
                                if (node.isLeaf()) {
                                    leafCount++;
                                }
                            });
                            me.setValue(leafCount);
                        }
                    });
                },
                single: true
            }
        }]
    });
    Ext.define('SimpleFilter.Main', {
        extend: "Ext.container.Container",
        border: true,
        padding: 10,
        initComponent: function () {
            var me = this;
            Ext.each(me.items, function (item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border: "1px solid #333"
                };
                item.padding = 10;
                item.height = 450;
            });
            me.callParent();
        },
        onRender: function () {
            var me = this;
            me.callParent(arguments);
            if (me.border) {
                me.el.setStyle("border", "1px solid #333");
            }
        }
    });

    Ext.create('SimpleFilter.store.Animals', {
        storeId: 'Animals'
    });
    Ext.create('SimpleFilter.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'tree-animals'
        }]
    });
});