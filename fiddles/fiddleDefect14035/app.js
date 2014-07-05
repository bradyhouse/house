Ext.onReady(function() {

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
            convert: function(value, record) {
                return record.isUserCorp() ? record.get('userCorpId') + ' - ' + record.get('corpName') + ' - ' + record.get('orgId') : record.get('closingAccountId') + ' ' + record.get('SegregationType');
            }
        }],
        isUserCorp: function() {
            return !this.get('closingAccountId');
        },
        isClosingAccount: function() {
            return !!this.get('closingAccountId');
        }
    });

    /*****************************************
     * CREATE THE TREE STORE ATTACHED TO THE
     * USER MODEL.
     */
    Ext.define('Fiddle.store.UserCorps', {
        extend: 'Ext.data.TreeStore',
        requires: ['Fiddle.model.UserCorp'],
        model: 'Fiddle.model.UserCorp',
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'children'
            }
        },
        autoLoad: true
    });

    /*****************************
     * DEFINE THE TREE PANEL
     */
    Ext.define('Fiddle.view.UserCorps', {
        extend: 'Ext.tree.Panel',
        store: 'UserCorps',
        alias: 'widget.usercorps',
        title: '4.2.2 TreeStore Upgraded to 5.0.0',
        rootVisible: false,
        scroll: 'both',
        columns: [{
            xtype: 'treecolumn',
            text: 'Tree Column',
            flex: 1.5,
            sortable: true,
            dataIndex: 'text'
        }]
    });

    /******************************************
     * CREATE AN INSTANCE OF THE USERS
     * STORE
     */
    Ext.create('Fiddle.store.UserCorps', {
        storeId: 'UserCorps'
    });

    /******************************************
     * CREATE AN INSTANCE OF THE TREE PANEL
     * CONTAINER
     */
    Ext.create('Fiddle.view.UserCorps', {
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'usercorps'
        }]
    });

});