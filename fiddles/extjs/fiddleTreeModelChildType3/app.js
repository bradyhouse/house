
Ext.onReady(function () {

    Ext.define('App.model.SettlementAccount', {
        extend: 'Ext.data.TreeModel',
        entityName: 'SettlementAccount',
        isSettlementAccount: true,
        idProperty: 'id',
        fields: [{
            name: 'id',
            convert: function(value, record) {
                return record.settlementAccount.id + ' - ' + record.settlementAccount.fundSegregationType
            }
        }, {
            name: 'positionAccount',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'positionAccount.originType'
        }, {
            name: 'performanceBondAccountId',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'performanceBondAccountId.originType'
        }, {
            name: 'fundSegregationType',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'settlementAccount.fundSegregationType'
        }, {
            name: 'settlementAccountId',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'settlementAccount.id'
        }, {
            name: 'guarantyFundId',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'guarantyFundId'
        }, {
            name: 'checked',
            type: 'auto',
            defaultValue: false
        }, {
            name: 'text',
            convert: function (value, record) {
                console.log(record);
                return record.data.settlementAccount.id + ' ' + record.data.settlementAccount.fundSegregationType;
            }
        }]

    });
    Ext.define('App.model.MemberFirm', {
        extend: 'Ext.data.TreeModel',
        isMemberFirm: true,
        requires: [
            'App.model.SettlementAccount'
        ],
        entityName: 'MemberFirm',
        childType: 'SettlementAccount',
        fields: [{
            name: 'id',
            convert: function (value, record) {
                return record.data.clearingOrganizationId + '-' + record.data.clearingMemberFirmId;
            }
        }, {
            name: 'clearingMemberFirmId',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'clearingMemberFirm.id'
        }, {
            name: 'checked',
            type: 'auto',
            defaultValue: false
        }, {
            name: 'firmName',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'clearingMemberFirm.longName'
        }, {
            name: 'clearingOrganizationId',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'clearingOrganizationEntity.id'
        }, {
            name: 'guarantyFunds',
            type: 'auto',
            defaultValue: undefined,
            mapping: 'guarantyFundIds'
        },  {
            name: 'text',
            convert: function (value, record) {
                return record.get('clearingMemberFirmId') + ' - ' + record.get('firmName') + ' - ' + record.get('clearingOrganizationId');
            }
        }]
    });
    Ext.define('App.store.MemberFirms', {
        extend: 'Ext.data.TreeStore',
        requires: [
            'App.model.SettlementAccount',
            'App.model.MemberFirm'
        ],
        model: 'App.model.MemberFirm',
        proxy: {
            type: 'ajax',
            reader: {
                type: 'json'
            },
            url: 'data.json'
        },
        autoLoad: false
    });

    var store = Ext.create('App.store.MemberFirms', {
        storeId: 'MemberFirms'
    });
    store.load();
    Ext.create('Ext.tree.Panel', {
        title: 'Heterogeneous TreeModel',
        store: store,
        rootVisible: false,
        renderTo: Ext.getBody(),
        listeners: {
            checkchange: function(node, checked) {
                if (node.isSettlementAccount) {
                    Ext.Msg.alert('checkchange', node.parentNode.get('clearingOrganizationId'));
                }
            }
        }
    });
});
