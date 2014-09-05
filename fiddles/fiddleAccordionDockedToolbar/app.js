Ext.onReady(function() {

    Ext.define('MyFiddle.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function() {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'MyFiddle-'
        }));
    });

    /* SEARCH TOOL DEFINITION */
    Ext.define('MyFiddle.view.SearchTool', {
        extend: 'Ext.toolbar.Toolbar',
        alias: 'widget.searchbar',
        initComponent: function() {
            var me = this;
            me.items = me.getItemCollection();
            me.callParent();
        },
        // @private
        getItemCollection: function() {
            var me = this;
            return [{
                labelWidth: 50,
                xtype: 'triggerfield',
                itemId: me.id + '-criteriaField',
                fieldLabel: 'Search',
                triggerCls: 'x-form-clear-trigger',
                onTriggerClick: function() {
                    var me = this,
                        store = me.up('treepanel').store;
                    me.reset();
                    store.clearFilter();
                    me.focus();
                },
                listeners: {
                    change: function() {
                        var tree = this.up('treepanel'),
                            v,
                            matches = 0;

                        try {
                            v = new RegExp(this.getValue(), 'i');
                            tree.store.filter({
                                filterFn: function(node) {
                                    var children = node.childNodes,
                                        len = children && children.length,
                                        visible = node.isLeaf() ? v.test(node.get('text')) : false,
                                        i;
                                    for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

                                    if (visible && node.isLeaf()) {
                                        matches++;
                                    }
                                    return visible;
                                },
                                id: me.id + '-leafFilter'
                            });
                        } catch (e) {
                            this.markInvalid('Invalid regular expression');
                        }
                        tree.down('#' + me.id + '-matches').setValue(matches);
                    },
                    buffer: 250
                },
                style: {
                    padding: '0px 5px 0px 5px'
                }
            }, {
                xtype: 'displayfield',
                itemId: me.id + '-matches',
                fieldLabel: 'Matches:',
                value: '0',
                style: {
                    padding: '0px 5px 0px 0px'
                },
                labelWidth: 65,
                listeners: {
                    beforerender: function() {
                        var me = this,
                            tree = me.up('treepanel'),
                            root = tree.getRootNode(),
                            leafCount = 0;

                        tree.store.on('fillcomplete', function(store, node) {
                            if (node === root) {
                                root.visitPostOrder('', function(node) {
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
            }];
        }
    });

    /* BASE CLASSES DEFINITION */
    Ext.define('MyFiddle.store.StoreBaseClass', {
        extend: 'Ext.data.TreeStore',
        root: {
            id: 'root',
            expanded: false
        },
        clearOnLoad: true,
        constructor: function(config) {
            var me = this;
            me.callParent([config]);
            me.on('load', me.onStoreLoad);
        },
        onStoreLoad: function(store, records, successful) {
            var me = this,
                tree = store.ownerTree,
                id = tree.getStateId(),
                state = Ext.state.Manager.get(id),
                root = tree.getRootNode();
            if (successful) {
                if (state && !Ext.Object.isEmpty(state.nodes)) {
                    me.restoreTreeState(root, tree, state);
                }
            }
        },
        // @private
        restoreTreeState: function(root, tree, state) {
            root.cascadeBy(function(model) {
                var text = model.get('text'),
                    node = state.nodes[text];
                if (node) {
                    if (node.checked) {
                        model.set('checked', node.checked);
                    }
                    if (node.expanded) {
                        tree.expandNode(model);
                    }
                }
            });
        }
    });
    Ext.define('MyFiddle.view.TreeBaseClass', {
        extend: 'Ext.tree.Panel',
        requires: ['MyFiddle.StateManager', 'MyFiddle.view.SearchTool'],
        rootVisible: false,
        collapseFirst: true,
        useArrows: true,
        stateEvents: ['itemcollapse', 'itemexpand', 'checkchange'],
        stateful: true,
        getState: function() {
            var nodes = {},
                checked = this.getChecked(),
                text = null;
            try {
                Ext.Array.forEach(checked, function(node) {
                    text = node.get('text');
                    if (text) {
                        nodes[text] = {
                            checked: node.get('checked'),
                            expanded: node.isExpanded()
                        };
                    }
                });
            } catch (err) {
                Ext.Msg.show('Error', err.message);
            }
            return {
                nodes: nodes
            };
        },
        constructor: function(config) {
            var me = this,
                cfg = config || {};
            cfg.tools = me.getToolsCollection();
            cfg.toolsCfg = {
                buttonAlign: 'left'
            };
            me.callParent([cfg]);
        },
        // @private
        getToolsCollection: function() {
            var me = this;
            return [{
                xtype: 'searchbar',
                itemId: me.xtype + '-searchbar',
                hidden: true
            }, {
               xtype: 'tbspacer',
                flex: 5
            }, {
                xtype: 'tbfill',
                flex: 5
            }, {
                type: 'search',
                itemId: me.xtype + '-search',
                hidden: false,
                onClick: function() {
                    var panel = Ext.ComponentQuery.query(me.xtype+'(true)')[0],
                        bar = panel.query('searchbar(true)')[0],
                        closeBtn = panel.query('#' + me.xtype + '-close')[0],
                        searchBtn = Ext.ComponentQuery.query('#' + me.xtype + '-search')[0];
                    if (bar) {
                        bar.show();
                        if (searchBtn) {
                            searchBtn.hide();
                            if (closeBtn) {
                                closeBtn.show();
                            }
                        }
                    }
                }
            }, {
                type: 'close',
                itemId: me.xtype + '-close',
                hidden: true,
                onClick: function() {
                    var panel = Ext.ComponentQuery.query(me.xtype+'(true)')[0],
                        bar = panel.query('searchbar(true)')[0],
                        closeBtn = panel.query('#' + me.xtype + '-close')[0],
                        searchBtn = Ext.ComponentQuery.query('#' + me.xtype + '-search')[0];
                    if (bar) {
                        bar.hide();
                        if (searchBtn) {
                            searchBtn.show();
                            if (closeBtn) {
                                closeBtn.hide();
                            }
                        }
                    }
                }
            }];
        }
    });

    /* ANIMALS PANEL DEFINITION */
    Ext.define('MyFiddle.model.Animal', {
        extend: 'Ext.data.TreeModel',
        entityName: 'Animal',
        idProperty: 'animalid',
        fields: [{
            name: "text",
            convert: undefined
        }, {
            name: "checked",
            defaultValue: false
        }, {
            name: "expanded",
            defaultValue: false
        }]
    });
    Ext.define('MyFiddle.store.Animals', {
        extend: 'MyFiddle.store.StoreBaseClass',
        requires: ['MyFiddle.model.Animal'],
        storeId: 'animals',
        model: 'MyFiddle.model.Animal',
        alias: 'animals',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'animals.json'
        }
    });
    Ext.define('MyFiddle.view.AnimalTree', {
        extend: 'MyFiddle.view.TreeBaseClass',
        alias: 'widget.tree-animals',
        initComponent: function() {
            var me = this;
            Ext.suspendLayouts();
            me.stateId = 'animalTreeState';
            me.store = Ext.createByAlias('animals');
            Ext.resumeLayouts(true);
            me.callParent();
        }
    });
    Ext.define('MyFiddle.view.AnimalPanel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.animalpanel',
        requires: ['MyFiddle.view.AnimalTree'],
        title: 'Animals',
        stateEvents: ['expand', 'collapse'],
        stateId: 'animalPanelState',
        saveDelay: 1000,
        stateful: true,
        items: [{
            xtype: 'tree-animals'
        }]
    });

    /* PEOPLE PANEL DEFINITION */
    Ext.define('MyFiddle.model.Person', {
        extend: 'Ext.data.TreeModel',
        entityName: 'Person',
        idProperty: 'personid',
        fields: [{
            name: "text",
            convert: undefined
        }, {
            name: "checked",
            defaultValue: false
        }, {
            name: "expanded",
            defaultValue: false
        }]
    });
    Ext.define('MyFiddle.store.People', {
        extend: 'MyFiddle.store.StoreBaseClass',
        requires: ['MyFiddle.model.Person'],
        model: 'MyFiddle.model.Person',
        alias: 'people',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'people.json'
        }
    });
    Ext.define('MyFiddle.view.PeopleTree', {
        extend: 'MyFiddle.view.TreeBaseClass',
        alias: 'widget.tree-people',
        initComponent: function() {
            var me = this;
            Ext.suspendLayouts();
            me.stateId = 'peopleTreeState';
            me.store = Ext.createByAlias('people');
            Ext.resumeLayouts(true);
            me.callParent();
        }
    });
    Ext.define('MyFiddle.view.PeoplePanel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.peoplepanel',
        requires: ['MyFiddle.view.PeopleTree'],
        stateEvents: ['expand', 'collapse'],
        stateId: 'peoplePanelState',
        stateful: true,
        title: 'People',
        items: [{
            xtype: 'tree-people'
        }]
    });

    Ext.define('MyFiddle.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['Ext.layout.container.Accordion', 'MyFiddle.view.PeoplePanel', 'MyFiddle.view.AnimalPanel'],
        alias: 'widget.accordionpanel',
        layout: {
            type: 'accordion',
            activeOnTop: true
        },
        items: [{
            xtype: 'peoplepanel',
            itemId: 'people',
            title: 'People',
            flex: 1
        }, {
            xtype: 'animalpanel',
            itemId: 'animal',
            title: 'Animals',
            flex: 1
        }]
    });
    Ext.create('MyFiddle.view.Main', {
        renderTo: Ext.getBody()
    });
});