Ext.onReady(function() {

    Ext.define('fiddleBigTreeState.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function() {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'fiddleBigTreeState-'
        }));
    });

    Ext.define('fiddleBigTreeState.model.Animal', {
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

    Ext.define('fiddleBigTreeState.store.Animals', {
        extend: 'Ext.data.TreeStore',
        model: 'fiddleBigTreeState.model.Animal',
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

    Ext.define('fiddleBigTreeState.tree.Animals', {
        extend: 'Ext.tree.Panel',
        requires: ['fiddleBigTreeState.StateManager'],
        rootVisible: false,
        alias: 'widget.tree-animals',
        collapseFirst: false,
        title: 'Big TreeStore ~ 500 Nodes',
        flex: 1,
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

<<<<<<< HEAD
=======

>>>>>>> b4bda69ea75640ec6729ad591092444755f37038
    Ext.create('fiddleBigTreeState.tree.Animals', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'tree-animals'
        }]

    });

});