Ext.onReady(function() {
    var fiddleHeader = 'Field Container',
        fiddleSubHeader = '<i>Fiddle adapted from the <b>Kitchen Sink\'s "Field Container"</b> Example.</i>';

    // Fiddle
    Ext.define('MyFiddle.PartTimeEmployee', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'email',     type: 'string'},
            {name: 'title',     type: 'string'},
            {name: 'firstName', type: 'string'},
            {name: 'lastName',  type: 'string'},
            {name: 'phone-1',   type: 'string'},
            {name: 'phone-2',   type: 'string'},
            {name: 'phone-3',   type: 'string'},
            {name: 'hours',     type: 'number'},
            {name: 'minutes',   type: 'number'},
            {name: 'startDate', type: 'date'},
            {name: 'endDate',   type: 'date'}
        ]
    });
    Ext.define('MyFiddle.FieldContainerController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.form-fieldcontainer',

        requires: [
            'MyFiddle.PartTimeEmployee'
        ],

        onLoadClick: function() {
            this.getView().loadRecord(Ext.create('MyFiddle.PartTimeEmployee', {
                'email'    : 'mbedlington@gmail.com',
                'title'    : 'miss',
                'firstName': 'Molly',
                'lastName' : 'Bedlington',
                'startDate': '01/10/2008',
                'endDate'  : '12/11/2009',
                'phone-1'  : '555',
                'phone-2'  : '123',
                'phone-3'  : '4567',
                'hours'    : 10,
                'minutes'  : 20
            }));
        },

        onSaveClick: function() {
            var form   = this.getView(),
                encode = Ext.String.htmlEncode,
                s      = '';

            if (form.isValid()) {
                Ext.iterate(form.getValues(), function(key, value) {
                    value = encode(value);

                    s += Ext.util.Format.format("{0} = {1}<br />", key, value);
                }, this);

                Ext.Msg.alert('Form Values', s);
            }
        },

        onResetClick: function() {
            this.getView().reset();
        }
    });
    Ext.define('MyFiddle.FieldContainer', {
        extend: 'Ext.form.Panel',
        xtype: 'form-fieldcontainer',
        controller: 'form-fieldcontainer',
        title: 'Employee Information',
        flex: 1,
        bodyPadding: 10,
        defaults: {
            anchor: '100%',
            labelWidth: 100
        },
        items: [{
            xtype: 'textfield',
            name: 'email',
            fieldLabel: 'Email Address',
            vtype: 'email',
            msgTarget: 'side',
            allowBlank: false
        }, {
            xtype: 'fieldcontainer',
            fieldLabel: 'Availability',
            combineErrors: true,
            msgTarget : 'side',
            layout: 'hbox',
            defaults: {
                flex: 1,
                hideLabel: true
            },
            items: [{
                xtype: 'datefield',
                name: 'startDate',
                fieldLabel: 'Start',
                margin: '0 5 0 0',
                allowBlank: false
            }, {
                xtype     : 'datefield',
                name      : 'endDate',
                fieldLabel: 'End',
                allowBlank: false
            }]
        }, {
            xtype: 'fieldset',
            title: 'Details',
            collapsible: true,
            defaults: {
                labelWidth: 89,
                anchor: '100%',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                }
            },
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: 'Phone',
                combineErrors: true,
                msgTarget: 'under',
                defaults: {
                    hideLabel: true
                },
                items: [
                    {xtype: 'displayfield', value: '('},
                    {xtype: 'textfield',    fieldLabel: 'Phone 1', name: 'phone-1', width: 45, allowBlank: false},
                    {xtype: 'displayfield', value: ')'},
                    {xtype: 'textfield',    fieldLabel: 'Phone 2', name: 'phone-2', width: 45, allowBlank: false, margin: '0 5 0 0'},
                    {xtype: 'displayfield', value: '-'},
                    {xtype: 'textfield',    fieldLabel: 'Phone 3', name: 'phone-3', width: 60, allowBlank: false}
                ]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: 'Time worked',
                combineErrors: false,
                defaults: {
                    hideLabel: true
                },
                items: [{
                    name : 'hours',
                    xtype: 'numberfield',
                    width: 95,
                    allowBlank: false
                }, {
                    xtype: 'displayfield',
                    value: 'hours'
                }, {
                    name : 'minutes',
                    xtype: 'numberfield',
                    width: 95,
                    allowBlank: false
                }, {
                    xtype: 'displayfield',
                    value: 'mins'
                }]
            }, {
                xtype : 'fieldcontainer',
                combineErrors: true,
                msgTarget: 'side',
                fieldLabel: 'Full Name',
                defaults: {
                    hideLabel: true
                },
                items: [{
                    //the width of this field in the HBox layout is set directly
                    //the other 2 items are given flex: 1, so will share the rest of the space
                    width: 75,
                    xtype: 'combo',
                    queryMode: 'local',
                    value: 'mrs',
                    triggerAction: 'all',
                    forceSelection: true,
                    editable: false,
                    fieldLabel: 'Title',
                    name: 'title',
                    displayField: 'name',
                    valueField: 'value',
                    store: {
                        fields: ['name', 'value'],
                        data: [
                            {name : 'Mr',   value: 'mr'},
                            {name : 'Mrs',  value: 'mrs'},
                            {name : 'Miss', value: 'miss'}
                        ]
                    }
                }, {
                    xtype: 'textfield',
                    flex : 1,
                    name : 'firstName',
                    fieldLabel: 'First',
                    allowBlank: false
                }, {
                    xtype: 'textfield',
                    flex : 1,
                    name : 'lastName',
                    fieldLabel: 'Last',
                    allowBlank: false
                }]
            }]
        }],
        buttons: [{
            text   : 'Load test data',
            handler: 'onLoadClick'
        }, {
            text   : 'Save',
            handler: 'onSaveClick'
        }, {
            text   : 'Reset',
            handler: 'onResetClick'
        }]
    });

    // Boiler Plate
    Ext.define('MyFiddle.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['MyFiddle.FieldContainer'],
        alias: 'widget.main',
        layout: {
            type: 'box'
        },
        items: [{
            xtype: 'form-fieldcontainer'
        }],
        initComponent: function() {
            var me = this;
            Ext.each(me.items, function(item) {
                item.style = {
                    backgroundColor: "#f4f4f",
                    border: "1px solid"
                };
                item.padding = 2;
            });
            me.callParent();
        }
    });
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader,
            subheader: fiddleSubHeader
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        border:	true,
        padding: 25,
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            bind: {
                title: '{header}'
            },
            items: [{
                xtype: 'panel',
                padding: 10,
                border: false,
                bind: {
                    html: '{subheader}'
                }
            }],
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'main'
        }],
        initComponent: function() {
            var me = this;
            this.style = {
                backgroundColor: "#f4f4f", // neutral
                border: '1px solid',
                margin: '10 10 10 10'
            };
            me.callParent();
        }
    });

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});
