/**
 *
 * This plugin allows the user to modify records behind a pivot cell.
 * The user has to double click that cell to open the range editor window.
 *
 * The following types of range editing are available:
 * - percentage: the user fills in a percentage that is applied to each record.
 * - increment:  the user fills in a value that is added to each record.
 * - overwrite:  the new value filled in by the user overwrites each record.
 * - uniformly:  the user fills in a value that is uniformly applied to each record.
 *
 */
Ext.define('Ext.pivot.plugin.RangeEditor', {
    alternateClassName: [
        'Mz.pivot.plugin.RangeEditor'
    ],

    alias: [
        'plugin.pivotrangeeditor',
        'plugin.mzrangeeditor'
    ],

    extend: 'Ext.AbstractPlugin',

    requires: [
        'Ext.pivot.Grid',
        'Ext.window.Window',
        'Ext.form.field.Text',
        'Ext.form.field.Number',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Display',
        'Ext.button.Button',
        'Ext.data.Store'
    ],

    mixins: {
        observable: 'Ext.util.Observable'
    },

    /**
     * @cfg {Number} width Width of the viewer's window.
     */
    width:        null,
    /**
     * @cfg {Number} height Height of the viewer's window.
     */
    height:        null,
    /**
     * @cfg {String} textWindowTitle Range editor window title
     */
    textWindowTitle:    'Range editor',
    /**
     * @cfg {String} textFieldValue Range editor field Value label
     */
    textFieldValue:     'Value',
    /**
     * @cfg {String} textFieldEdit Range editor field Edit label
     */
    textFieldEdit:      'Field',
    /**
     * @cfg {String} textFieldType Range editor field Type label
     */
    textFieldType:      'Type',
    /**
     * @cfg {String} textButtonOk Range editor window Ok button text
     */
    textButtonOk:       'Ok',
    /**
     * @cfg {String} textButtonCancel Range editor window Cancel button text
     */
    textButtonCancel:   'Cancel',
    /**
     * @cfg {String} textTypePercentage Type of range editing
     */
    textTypePercentage: 'Percentage',
    /**
     * @cfg {String} textTypeIncrement Type of range editing
     */
    textTypeIncrement:  'Increment',
    /**
     * @cfg {String} textTypeOverwrite Type of range editing
     */
    textTypeOverwrite:  'Overwrite',
    /**
     * @cfg {String} textTypeUniformly Type of range editing
     */
    textTypeUniformly:  'Uniformly',

    /**
     * @cfg {Function} onBeforeRecordsUpdate Provide a function to handle the records update.
     *       This one will be fired before updating the records. Return false if you want to stop the process.
     *       The function receives the following arguments: pivot, colDefinition, records, newValue, oldValue
     */
    onBeforeRecordsUpdate: Ext.emptyFn,

    /**
     * @cfg {Function} onAfterRecordsUpdate Provide a function to handle the records update.
     *       This one will be fired after all records were updated. "sync" could be called on the store inside this function.
     *		The function receives the following arguments: pivot, colDefinition, records, newValue, oldValue
     */
    onAfterRecordsUpdate: Ext.emptyFn,

    /**
     *  `"both"` (the default) - The plugin is added to both grids
     *  `"top"` - The plugin is added to the containing Panel
     *  `"locked"` - The plugin is added to the locked (left) grid
     *  `"normal"` - The plugin is added to the normal (right) grid
     *
     * @private
     */
    lockableScope:  'top',

    init: function(grid){
        var me = this;

        //<debug>
        // this plugin is available only for the pivot grid
        if (!grid.isPivotGrid) {
            Ext.raise('This plugin is only compatible with Ext.pivot.Grid');
        }
        //</debug>

        me.pivot = grid;
        me.pivotListeners = me.pivot.on({
            pivotitemcelldblclick:      me.runPlugin,
            pivotgroupcelldblclick:     me.runPlugin,
            pivottotalcelldblclick:     me.runPlugin,
            scope:                      me,
            destroyable:                true
        });

        me.callParent(arguments);
    },

    destroy: function(){
        var me = this;

        Ext.destroyMembers(me, 'view', 'pivotListeners');

        me.pivot = me.view = me.pivotListeners = me.currentRecord = me.currentCol = me.currentResult = null;

        me.callParent(arguments);
    },

    runPlugin: function(params, e, eOpts){
        var me = this,
            matrix = me.pivot.getMatrix(),
            dataIndex;

        // do nothing if the plugin is disabled
        if(me.disabled) {
            return;
        }

        if(params.topKey){
            me.initEditorWindow();

            me.currentResult = matrix.results.get(params.leftKey, params.topKey);
            if(me.currentResult){
                me.currentCol = params.column;
                dataIndex = me.currentCol.dimension.getId();

                me.view.down('form').getForm().setValues({
                    field:      me.currentCol.dimension.header || me.currentCol['text'] || me.currentCol.dimension.dataIndex,
                    value:      me.currentResult.getValue(dataIndex),
                    type:       'uniformly'
                });
                me.view.show();
            }
        }
    },

    updateRecords: function(){
        var me = this,
            result = me.currentResult,
            colDef = me.currentCol,
            agg = colDef.dimension.getId(),
            dataIndex = colDef.dimension.dataIndex,
            values = me.view.down('form').getForm().getValues(),
            records, remainder = 0;

        records = result.records;

        if(me.onBeforeRecordsUpdate(me.pivot, colDef, records, values.value, result.getValue(agg)) === false){
            return;
        }

        me.view.getEl().mask();
        values.value = parseFloat(values.value);

        Ext.defer(function(){
            Ext.Array.each(records, function(item){
                var currValue = item.get(dataIndex),
                    newValue, v;

                switch(values.type){
                    case 'percentage':
                        v = Math.floor(currValue * values.value / 100);
                        break;

                    case 'increment':
                        v = currValue + values.value;
                        break;

                    case 'overwrite':
                        v = values.value;
                        break;

                    case 'uniformly':
                        newValue = (1 / records.length * values.value) + remainder;
                        v = Math.floor(newValue);
                        remainder += (newValue - v);
                        break;
                }

                // only apply a change if there is actually a change
                if( currValue != v ) {
                    item.set(dataIndex, v);
                }
            });

            me.onAfterRecordsUpdate(me.pivot, colDef, records, values.value, result.getValue(agg));

            me.view.getEl().unmask();
            me.view.close();

        }, 10);

    },

    initEditorWindow: function(){
        var me = this;

        if(!me.view){
            // create the editor window
            me.view = Ext.create('Ext.window.Window', {
                title:          me.textWindowTitle,
                width:          me.width,
                height:         me.height,
                layout:         'fit',
                modal:          true,
                closeAction:    'hide',
                items: [{
                    xtype:      'form',
                    padding:    5,
                    border:     false,
                    defaults: {
                        anchor:     '100%'
                    },
                    items: [{
                        fieldLabel:     me.textFieldEdit,
                        xtype:          'displayfield',
                        name:           'field'
                    },{
                        fieldLabel:     me.textFieldType,
                        xtype:          'combo',
                        name:           'type',
                        queryMode:      'local',
                        valueField:     'id',
                        displayField:   'text',
                        editable:       false,
                        store: Ext.create('Ext.data.Store',{
                            fields: ['id', 'text'],
                            data: [
                                {'id': 'percentage', 'text': me.textTypePercentage},
                                {'id': 'increment', 'text': me.textTypeIncrement},
                                {'id': 'overwrite', 'text': me.textTypeOverwrite},
                                {'id': 'uniformly', 'text': me.textTypeUniformly}
                            ]
                        })
                    },{
                        fieldLabel:     me.textFieldValue,
                        xtype:          'numberfield',
                        name:           'value'
                    }]
                }],
                buttons: [{
                    text:       me.textButtonOk,
                    handler:    me.updateRecords,
                    scope:      me
                },{
                    text:       me.textButtonCancel,
                    handler:    function(){
                        this.view.close();
                    },
                    scope:      me
                }]
            });
        }
    }

});
