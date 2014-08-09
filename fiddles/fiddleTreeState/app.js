
Ext.onReady(function () {

    Ext.define('fiddleTreeState.StateManager', {
        requires: [
            'Ext.state.Manager',
            'Ext.state.LocalStorageProvider'
        ]
    }, function () {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'fiddleTreeState-'
        }));
    });

    Ext.define('fiddleTreeState.model.Animal', {
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

    Ext.define('fiddleTreeState.store.Animals', {
        extend: 'Ext.data.TreeStore',
        model: 'fiddleTreeState.model.Animal',
        alias: 'animals',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'data.json'
        },
        constructor: function (config) {
            var me = this;
            me.callParent([config]);
            me.on('load', me.onStoreLoad);
        },
        onStoreLoad: function (store, records, successful) {
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
        restoreTreeState: function (root, tree, state) {
            root.cascadeBy(function (model) {
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

    Ext.define('fiddleTreeState.tree.Animals', {
        extend: 'Ext.tree.Panel',
        requires: [
            'fiddleTreeState.StateManager'
        ],
        rootVisible: false,
        alias: 'widget.tree-animals',
        frame: true,
        collapseFirst: false,
        title: 'Tree Store State',
        width: 650,
        height: 800,
        useArrows: true,
        animate: false,
        stateId: 'tree-state',
        stateEvents: ['itemcollapse', 'itemexpand', 'checkchange'],
        saveDelay: 1000,
        stateful: true,
        getState: function () {
            var nodes = {},
                checked = this.getChecked();
            Ext.Array.forEach(checked, function (node) {
                var text = node.get('text');
                if (text) {
                    nodes[text] = {
                        checked: node.get('checked'),
                        expanded: node.isExpanded()
                    };
                }
            });
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

    Ext.create('fiddleTreeState.tree.Animals', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'tree-animals'
        }]

    });

});
