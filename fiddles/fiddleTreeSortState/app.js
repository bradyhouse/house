Ext.onReady(function() {

    Ext.define('fiddleTreeSortState.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function() {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'fiddleTreeSortState-'
        }));
    });

    Ext.define('fiddleTreeSortState.model.Animal', {
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

    Ext.define('fiddleTreeSortState.store.Animals', {
        extend: 'Ext.data.TreeStore',
        model: 'fiddleTreeSortState.model.Animal',
        alias: 'animals',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'data.json'
        },
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
                    console.log(state.nodes);
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

    Ext.define('fiddleTreeSortState.tree.Animals', {
        extend: 'Ext.tree.Panel',
        requires: ['fiddleTreeSortState.StateManager'],
        rootVisible: false,
        alias: 'widget.tree-animals',
        frame: true,
        collapseFirst: false,
        title: 'Tree Store - Sort State',
        width: 650,
        height: 800,
        useArrows: true,
        animate: false,
        stateId: 'animalSelections',
        stateEvents: ['itemcollapse', 'itemexpand', 'checkchange'],
        saveDelay: 1000,
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
        initComponent: function() {
            var me = this;
            Ext.suspendLayouts();
            me.store = Ext.createByAlias('animals');
            Ext.resumeLayouts(true);
            me.callParent();
        }

    });

    Ext.create('fiddleTreeSortState.tree.Animals', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'tree-animals'
        }]

    });
});