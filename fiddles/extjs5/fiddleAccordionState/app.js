Ext.onReady(function () {

    Ext.define('MyFiddle.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function () {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'MyFiddle-'
        }));
    });

    /* BASE CLASSES DEFINITION */
    Ext.define('MyFiddle.store.StoreBaseClass', {
        extend: 'Ext.data.TreeStore',
        root: {
            id: 'root',
            expanded: false
        },
        clearOnLoad: true,
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
    Ext.define('MyFiddle.view.TreeBaseClass', {
        extend: 'Ext.tree.Panel',
        requires: ['MyFiddle.StateManager'],
        rootVisible: false,
        collapseFirst: true,
        useArrows: true,
        stateEvents: ['itemcollapse', 'itemexpand', 'checkchange'],
        tools: [
            {type: 'close'},
            {type: 'minimize'},
            {type: 'maximize'},
            {type: 'restore'},
            {type: 'toggle'},
            {type: 'gear'},
            {type: 'prev'},
            {type: 'next'},
            {type: 'pin'},
            {type: 'unpin'},
            {type: 'right'},
            {type: 'left'},
            {type: 'down'},
            {type: 'up'},
            {type: 'refresh'},
            {type: 'plus'},
            {type: 'minus'},
            {type: 'search'},
            {type: 'save'},
            {type: 'help'},
            {type: 'print'},
            {type: 'expand'},
            {type: 'collapse'}
        ],
        stateful: true,
        getState: function () {
            var nodes = {},
                checked = this.getChecked(),
                text = null;
            try {
                Ext.Array.forEach(checked, function (node) {
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
        initComponent: function () {
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
        },
    });
    Ext.define('MyFiddle.view.PeopleTree', {
        extend: 'MyFiddle.view.TreeBaseClass',
        alias: 'widget.tree-people',
        initComponent: function () {
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
            itemId: 'people-1',
            title: 'People',
            flex: 1
        }, {
            xtype: 'animalpanel',
            itemId: 'animal-1',
            title: 'Animals',
            flex: 1
        }]
    });
    Ext.create('MyFiddle.view.Main', {
        renderTo: Ext.getBody()
    });
});