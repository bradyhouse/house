/**
 *
 * This is the window that allows configuring a top10 value filter
 *
 * @private
 *
 */
Ext.define('Ext.pivot.plugin.configurator.FilterTopWindow',{
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

    titleText:      'Top 10 filter ({0})',
    fieldText:      'Show',
    sortResultsText:'Sort results',

    initComponent: function(){
        var me = this,
            items = [];

        items.push({
            xtype:          'combo',
            editable:       false,
            queryMode:      'local',
            valueField:     'value',
            store:          me.storeTopOrder,
            name:           'topOrder'
        },{
            xtype:          'textfield',
            margin:         '0 0 0 5',
            name:           'value'
        },{
            xtype:          'combo',
            margin:         '0 0 0 5',
            editable:       false,
            queryMode:      'local',
            valueField:     'value',
            store:          me.storeTopType,
            name:           'topType'
        },{
            xtype:          'combo',
            margin:         '0 0 0 5',
            editable:       false,
            queryMode:      'local',
            valueField:     'value',
            store:          me.storeAgg,
            name:           'dimensionId'
        });

        Ext.apply(me, {
            title:      Ext.String.format(me.titleText, me.title),
            layout:     'fit',

            items: [{
                xtype:  'form',
                bodyPadding:    5,

                defaults: {
                    allowBlank: false
                },

                items: [{
                    xtype:  'hidden',
                    name:   'type'
                },{
                    xtype:  'hidden',
                    name:   'operator'
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
                        flex:       1,
                        allowBlank: false
                    },

                    items: items
                },{
                    xtype:          'checkbox',
                    boxLabel:       me.sortResultsText,
                    name:           'topSort'
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
        var form = this.down('form').getForm();

        if(form.isValid()){
            this.fireEvent('filter', this, form.getValues());
        }
    },

    cancelFilter: function(){
        this.close();
    }
});
