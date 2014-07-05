/* UNDER CONSTRUCTION */


/*****************************

 DEFINE FILTER

 ******************************/
Ext.define('UtilFilter.TitleFilter', {
    extend: 'Ext.util.Filter',
    filterFn: function(node) {
        var pattern = new RegExp(this.getValue(), 'i'),
            children = node.childNodes,
            len = children && children.length,
            visible = pattern.test(node.get('title')),
            i;
        for (i = 0; i < len && !(visible = children[i].get('visible')); i++);

        if (visible) {
            matches++;
        }
        return visible;
    },
    id: 'titleFilter'
});


/*****************************

 DEFINE ANIMAL MODEL

 ******************************/
Ext.define('UtilFilter.model.Animal', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Animal',
    idProperty: 'animalid',
    fields: [{
        name: 'title',
        convert: undefined
    }]
});

/*****************************

 DEFINE CLASSIFICATION MODEL

 ******************************/
Ext.define('UtilFilter.model.Classification', {
    extend: 'Ext.data.TreeModel',
    entityName: 'Classification',
    idProperty: 'classid',
    fields: [{
        name: 'title',
        convert: undefined
    }]
});


/*****************************

 DEFINE THE STORE.

 ******************************/

Ext.define('UtilFilter.store.Classifications', {
    extend: 'Ext.data.TreeStore',
    requires: [
        'UtilFilter.model.Animal'
    ],
    model: 'UtilFilter.model.Classification',
    proxy: {
        type: 'ajax',
        reader: {
            type: 'json',
            typeProperty: 'mtype'
        },
        url: 'Classifications.json'
    },
    autoLoad: true
});


/*****************************

 DEFINE THE TREE COMPONENT.

 ******************************/

Ext.define('UtilFilter.tree.Classifications',{
    extend: 'Ext.tree.Panel',
    require: ['UtilFilter.TitleFilter'],
    xtype: 'tree-classifications',
    store: 'Classifications',
    rootVisible: false,
    animate: false,
    frame: true,
    title: 'Animal Classifications',
    width: 650,
    height: 400,
    reserveScrollbar: true,
    useArrows: true,
    columns: [{
        xtype: 'treecolumn',
        text: 'Classification',
        flex: 1,
        sortable: true,
        dataIndex: 'title'
    }, {
        text: 'Entity',
        renderer: function (v, cellValues, record) {
            return record.entityName;
        }
    }],
    tbar: [{
        labelWidth: 130,
        xtype: 'triggerfield',
        fieldLabel: 'Filter',
        onTriggerClick: function() {
            var store = this.up('treepanel').store;

            this.reset();
            store.clearFilter();
            this.focus();
        },
        listeners: {
            change: function() {
                var tree = this.up('treepanel'),
                    pattern,
                    matches = 0,
                    titleFilter = new UtilFilter.TitleFilter({
                        value: this.getValue()
                    });
                try {
                    tree.store.setFilter(titleFilter);
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
        labelWidth: null,
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
    }]
});

/*****************************

 DEFINE THE MAIN CONTAINER.

 ******************************/
Ext.define('UtilFilter.Main', {
    extend: "Ext.container.Container",
    border:	true,
    padding: 10,
    initComponent: function() {
        var me = this;
        Ext.each(me.items,function(item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border:	"1px solid #333"
                };
                item.padding = 10;
                item.height = 450;
            }
        );
        me.callParent();
    },
    onRender: function() {
        var me = this;
        me.callParent(arguments);
        if(me.border){
            me.el.setStyle("border","1px solid #333");
        }
    }
});


Ext.require('Ext.form.field.Display');
Ext.require('Ext.form.field.Trigger');

/*****************************

 ONCE EXT IS READY, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.

 ******************************/
Ext.onReady(function() {
    Ext.create('UtilFilter.store.Classifications', {
        storeId: 'Classifications',
        autoLoad: true
    });
    Ext.create('UtilFilter.Main', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'tree-classifications'
        }]
    });
});