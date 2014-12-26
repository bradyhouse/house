Ext.onReady(function () {
    Ext.QuickTips.init();
    /* TOOL MIXIN */
    Ext.define('MyFiddle.ExcelExport',{
        extend: 'Ext.Mixin',
        mixinConfig: {
            id: 'excelexport',
            after: {
                addTools: 'onAfterAddTools'
            }
        },
        onAfterAddTools: function () {
            console.log('onAfterInit');
            var me = this;
            me.addTool([{
                type: 'save',
                tooltip: 'Export to Excel',
                callback: function () {
                    console.log('excel button callback');
                    me.onExcelExport(me);
                }
            }]);
        },
        onClassMixedIn: function (targetClass) {
            var className = targetClass.prototype.$className;
            console.log('onClassMixedIn');
            console.log(className);
        },
        onExcelExport: function (panel) {
            console.log('onExcelExport');
            console.log('targetClass');
            if (panel.isAnimalTree) {
                window.location = 'http://houseknecht.com/2014/labs/xlsx/Animals.xlsx';
                return;
            }
            if (panel.isPeopleTree) {
                window.location = 'http://houseknecht.com/2014/labs/xlsx/People.xlsx';
                return;
            }
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
        requires: ['MyFiddle.ExcelExport'],
        config: {
            rootVisible: false,
            collapseFirst: true,
            tools: [
                {type: 'toggle'},
                {type: 'gear'},
                {type: 'help'},
                {type: 'print'}
            ],
            useArrows: true
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
    /*Ext.define('MyFiddle.view.AnimalTreeController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.animaltree',
        onExcelExport: function () {
            console.log('onExcelExport');
            window.location = 'http://houseknecht.com/2014/labs/xlsx/Animals.xlsx';
        }
    });*/
    Ext.define('MyFiddle.view.AnimalTree', {
        extend: 'MyFiddle.view.TreeBaseClass',
        alias: 'widget.tree-animals',
        isAnimalTree: true,
        requires: [
            'MyFiddle.ExcelExport'
        ],
        mixins: {
            excelexport: 'MyFiddle.ExcelExport'
        },
        /*controller: 'animaltree', */
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
        requires: [
            'MyFiddle.ExcelExport'
        ],
        alias: 'widget.tree-people',
        mixins: {
            excelexport: 'MyFiddle.ExcelExport'
        },
        isPeopleTree: true,
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
