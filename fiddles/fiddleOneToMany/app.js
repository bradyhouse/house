/* UNDER CONSTRUCTION @ 6/25/2014 */

Ext.onReady(function() {

    /***************************
     * DEFINE EXCEPTION
     */
    function fiddleException(err) {
        console.log(err);
        Ext.Msg.alert('Error', err.message);
    }

    try {
        /**********************************
         * DEFINE THE ORDER MODEL
         */
        console.log('Defining Order Entity');
        try {
            Ext.define('FiddleOneToMany.model.Order', {
                extend: 'Ext.data.TreeModel',
                entityName: 'Order',
                fields: [
                    'id', 'total'],

                hasMany: {
                    model: 'OrderItem',
                    name: 'orderItems',
                    associationKey: 'order_items'
                }
            });
        } catch(err) {
            throw err;
        }

        /*********************************
         * DEFINE THE USER MODEL
         */
        console.log('Defining User Entity');
        try {
            Ext.define('FiddleOneToMany.model.User', {
                extend: 'Ext.data.TreeModel',
                entityName: 'User',
                fields: [
                    'id', 'name', 'total'],

                hasMany: {
                    model: 'Order',
                    name: 'orders'
                }
            });

        } catch(err) {
            throw err;
        }

        /************************************
         * DEFINE THE ORDER ITEM MODEL
         */
        console.log('Defining OrderItem Entity');
        try {
            Ext.define('FiddleOneToMany.model.OrderItem', {
                extend: 'Ext.data.TreeModel',
                entityName: 'OrderItem',
                fields: [
                    'id', 'price', 'quantity', 'order_id', 'product_id'],
            });
        } catch(err) {
            throw err;
        }

        /*****************************************
         * CREATE THE TREE STORE ATTACHED TO THE
         * USER MODEL.
         *
         * @type {Ext.data.TreeStore}
         */
        console.log('Defining Users Store');

        try {
            Ext.define('FiddleOneToMany.store.Users', {
                extend: 'Ext.data.TreeStore',
                requires: [
                  'FiddleOneToMany.model.User'
                ],
                model: 'FiddleOneToMany.model.User',
                proxy: {
                    type: 'ajax',
                    url: 'data.json',
                    reader: {
                        type: 'json',
                        rootProperty: 'users'
                    }
                }
            });
        } catch(err) {
            console.log(err);
            Ext.Msg.alert('Error', err.message);
        }


        /*****************************
         * DEFINE THE TREE PANEL
         */
        console.log('Defining Users View');
        try {
            Ext.define('FiddleOneToMany.view.Users', {
                extend: 'Ext.tree.Panel',
                store: 'Users',
                alias: 'widget.users',
                title: 'OneToMany',
                rootVisible: false,
                singleExpand: true,
                scroll: 'both',
                columns: [{
                    xtype: 'treecolumn',
                    text: 'Tree Column',
                    flex: 1.5,
                    sortable: true,
                    dataIndex: 'id'
                },{
                    text: 'Entity',
                    flex: 1,
                    renderer: function(v, cellValues, record) {
                        return record.entityName;
                    }
                }],
                single: true
            });
        } catch(err) {
            throw err;
        }

        /************************************
         * CREATE THE MAIN CONTAINER
         *
         */
        console.log('Defining Main container');
        try {
            Ext.define('FiddleOneToMany.Main', {
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
        } catch(err) {
            throw err;
        }

        /******************************************
         * CREATE AN INSTANCE OF THE USERS
         * STORE
         */
        console.log('Creating Users Store Instance');
        try {
            Ext.create('FiddleOneToMany.store.Users', {
                storeId: 'Users',
                autoLoad: true
            });
        } catch(err) {
            throw err;
        }
        /******************************************
         * CREATE AN INSTANCE OF THE MAIN
         * CONTAINER
         */
        console.log('Creating Main Container Instance');
        try {
            Ext.create('FiddleOneToMany.Main', {
                renderTo: Ext.getBody(),
                items: [{
                    xtype: 'users'
                }]
            });

        } catch(err) {
            throw err;
        }
    } catch(err) {
        throw new fiddleException(err);
    }



});
