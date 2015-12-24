/**
 *
 * This is the window that allows configuring a label filter
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.FilterLabelWindow',{
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldContainer',
        'Ext.form.field.Text',
        'Ext.form.field.Hidden',
        'Ext.form.field.ComboBox',
        'Ext.layout.container.HBox'
    ],

    modal:          true,
    closeAction:    'destroy',

    titleText:          'Label filter ({0})',
    fieldText:          'Show items for which the label',
    caseSensitiveText:  'Case sensitive',

    initComponent: function(){
        var me = this,
            items = [];

        items = me.filterFields || [];

        items.push({
            xtype:          'combo',
            editable:       false,
            queryMode:      'local',
            valueField:     'value',
            store:          me.store,
            name:           'operator',

            listeners: {
                change: function(combo, newValue){
                    var me = this,
                        hidden = me.isOperatorBetween(newValue);

                    me.down('#fValue').setVisible(!hidden);
                    me.down('#fValue').allowBlank = hidden;
                    me.down('#fFrom').setVisible(hidden);
                    me.down('#fFrom').allowBlank = !hidden;
                    me.down('#fTo').setVisible(hidden);
                    me.down('#fTo').allowBlank = !hidden;
                },
                scope:  me
            }
        },{
            itemId:     'fValue',
            xtype:      'textfield',
            margin:     '0 0 0 5',
            name:       'value'
        },{
            itemId:     'fFrom',
            xtype:      'textfield',
            margin:     '0 0 0 5',
            name:       'from'
        },{
            itemId:     'fTo',
            xtype:      'textfield',
            margin:     '0 0 0 5',
            name:       'to'
        });

        Ext.apply(me, {
            title:      Ext.String.format(me.titleText, me.title),
            layout:     'fit',

            items: [{
                xtype:  'form',
                bodyPadding:    5,

                items: [{
                    xtype:  'hidden',
                    name:   'type'
                },{
                    xtype:          'fieldcontainer',
                    labelSeparator: '',
                    fieldLabel:     me.fieldText,
                    labelAlign:     'top',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },

                    defaults: {
                        allowBlank: false,
                        flex:       1
                    },

                    items: items
                },{
                    xtype:          'checkbox',
                    boxLabel:       me.caseSensitiveText,
                    name:           'caseSensitive'
                }]
            }],

            buttons: [{
                text:       Ext.Msg.buttonText.ok,
                handler:    me.applyFilter,
                scope:      me
            },{
                text:       Ext.Msg.buttonText.cancel,
                handler:    me.cancelFilter,
                scope:      me
            }]
        });

        me.callParent(arguments);
    },

    applyFilter: function(){
        var form = this.down('form').getForm(),
            filter;

        if(form.isValid()){
            filter = form.getValues();

            if(this.isOperatorBetween(filter.operator)){
                filter.value = [filter.from, filter.to];
            }
            delete(filter.from);
            delete(filter.to);

            filter.caseSensitive = (filter.caseSensitive === 'on');
            filter.topSort = (filter.topSort === 'on');

            this.fireEvent('filter', this, filter);
        }
    },

    cancelFilter: function(){
        this.close();
    },

    isOperatorBetween: function(operator){
        return Ext.Array.indexOf(['between', 'not between'], operator) >= 0;
    }
});
