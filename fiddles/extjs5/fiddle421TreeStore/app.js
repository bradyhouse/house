Ext.onReady(function() {

    /***************************
     * DEFINE CUSTOM EXCEPTION
     */
    function fiddleException(err) {
        console.log(err);
        Ext.Msg.alert('Error', err.message);
    }

    try {

        /*******************************
         * DEFINE THE MODEL
         */

        Ext.define('Fiddle.model.UserCorp', {
            extend: 'Ext.data.TreeModel',
            fields: [{
                name: 'orgId',
                mapping: 'clOrgEntity.id',
                type: 'auto',
                defaultValue: 'undefined'
            }, {
                name: 'userCorpId',
                type: 'auto',
                defaultValue: undefined,
                mapping: 'clUserCorp.id'
            }, {
                name: 'corpName',
                mapping: 'clUserCorp.longName',
                type: 'auto',
                defaultValue: 'undefined'
            }, {
                name: 'source',
                mapping: 'reqSrcIds',
                type: 'auto',
                defaultValue: 'undefined'
            }, {
                name: 'closingAccountId',
                type: 'auto',
                defaultValue: undefined,
                mapping: 'closingAcct.id'
            }, {
                name: 'SegregationType',
                type: 'auto',
                defaultValue: undefined,
                mapping: 'closingAcct.srcSegregationType'
            }, {
                name: 'text',
                defaultValue: '?',
                convert: function (value, record) {
                    return record.isUserCorp() ? record.get('userCorpId') + ' - ' + record.get('corpName') + ' - ' + record.get('orgId') :
                        record.get('closingAccountId') + ' ' + record.get('SegregationType');
                }
            }],
            isUserCorp: function () {
                return !this.get('closingAccountId');
            },
            isClosingAccount: function () {
                return !!this.get('closingAccountId');
            }
        });

        /*****************************************
         * CREATE THE TREE STORE ATTACHED TO THE
         * USER MODEL.
         *
         * @type {Ext.data.TreeStore}
         */
        console.log('Define the UserCorp Store');

        try {
            Ext.define('Fiddle.store.UserCorps', {
                extend: 'Ext.data.TreeStore',
                requires: [
                    'Fiddle.model.UserCorp'
                ],
                model: 'Fiddle.model.UserCorp',
                proxy: {
                    type: 'ajax',
                    url: 'data.json',
                    reader: {
                        type: 'json',
                        root: 'children'
                    }
                }
            });
        } catch(err) {
            throw err;
        }

        /*****************************
         * DEFINE THE TREE PANEL
         */
        console.log('Defining UserCorps View');
        try {
            Ext.define('Fiddle.view.UserCorps', {
                extend: 'Ext.tree.Panel',
                store: 'UserCorps',
                alias: 'widget.usercorps',
                title: '4.2.1 TreeStore',
                rootVisible: false,
                scroll: 'both',
                columns: [{
                    xtype: 'treecolumn',
                    text: 'Tree Column',
                    flex: 1.5,
                    sortable: true,
                    dataIndex: 'text'
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
            Ext.define('Fiddle.view.Main', {
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
            Ext.create('Fiddle.store.UserCorps', {
                storeId: 'UserCorps'
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
            Ext.create('Fiddle.view.Main', {
                renderTo: Ext.getBody(),
                items: [{
                    xtype: 'usercorps'
                }]
            });

        } catch(err) {
            throw err;
        }

    } catch (err) {
        throw new fiddleException(err);
    }
});