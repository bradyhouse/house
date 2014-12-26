Ext.onReady(function() {
    var fiddleHeader = '<b>Extreme Fiddle</b> ~ Dynamic Charting',
        fiddleSubHeader = 'Fiddle exploring how to dynamically update a chart based on user input.',
        defaultMonthlyNumbers = {
            income: 10.50,
            expense: 1.75
        };

    // Money field
    Ext.define('MyFiddle.Money', {
        extend: 'Ext.form.field.Number',
        alias: 'widget.money',
        regex: /^\d{0,5}(\.\d{1,2})?$/,
        regexText: 'Enter a valid dollar amount',
        step: 1000,
        msgTarget: 'side'
    });

    // Budget Slicer
    Ext.define('MyFiddle.Budget', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'income',
            type: 'number'
        }, {
            name: 'expense',
            type: 'number'
        }, {
            name: 'disposable',
            convert: function(value, record) {
                return record.data.income - record.data.expense;
            }
        }]
    });
    Ext.define('MyFiddle.BudgetSlicerController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.form-budgetslicer',
        requires: [
            'MyFiddle.Budget',
            'Ext.util.DelayedTask'
        ],
        config: {
            inverted: false
        },
        onRender: function() {
            var me = this,
                delayedTask = new Ext.util.DelayedTask(function() {
                    me.loadDefaultValues();
                });
            delayedTask.delay(500);
        },
        onInvertClick: function() {
            var me = this;
            if (me.getView().isValid()) {
                this.setInverted(!this.getInverted());
                this.bindChart();
            }
        },
        onLoadClick: function() {
            this.loadDefaultValues();
        },
        onResetClick: function() {
            this.loadDefaultValues();
        },
        onInputChange: function() {
            var me = this,
                form = this.getView();
                delayedTask = new Ext.util.DelayedTask(function() {
                    me.loadFormRecord(form.down('money[name=income]').getValue(),
                        form.down('money[name=expense]').getValue());
                });
            delayedTask.delay(200);
        },
        // @private
        loadDefaultValues: function() {
            this.loadFormRecord(defaultMonthlyNumbers.income, defaultMonthlyNumbers.expense);
        },
        // @private
        bindChart: function() {
            var me = this,
                form = me.getView(),
                chartContainer = form ? form.up('panel').down('budget-chart') : null,
                chart = chartContainer ? chartContainer.down('polar') : null,
                expenseAmt = form.isValid() ? form.down('money[name=expense]').getValue() : 0,
                disposableAmt = expenseAmt ? form.down('money[name=disposable]').getValue() : 0,
                fieldArr = ['slice', 'amount'],
                dataArr = [{
                    slice: 'disposable',
                    amount: disposableAmt
                }, {
                    slice: 'expense',
                    amount: expenseAmt
                }];
            if (chart) {
                if (me.getInverted()) {
                    chart.bindStore({
                        fields: fieldArr,
                        data: [dataArr[1], dataArr[0]]
                    });
                } else {
                    chart.bindStore({
                        fields: fieldArr,
                        data: [dataArr[0], dataArr[1]]
                    });
                }
                chart.redraw();

            }
        },
        // @private
        loadFormRecord: function(inc, exp) {
            var me = this,
                form = me.getView();
            form.loadRecord(Ext.create('MyFiddle.Budget', {
                'income': inc,
                'expense': exp
            }));
            me.bindChart();
        }
    });
    Ext.define('MyFiddle.BudgetSlicer', {
        extend: 'Ext.form.Panel',
        xtype: 'form-budgetslicer',
        requires: ['MyFiddle.Money'],
        controller: 'form-budgetslicer',
        title: 'Monthly <i>Numbers</i>',
        flex: 1,
        bodyPadding: 10,
        listeners: {
            render: 'onRender'
        },
        defaults: {
            anchor: '50%',
            labelWidth: 200
        },
        items: [{
            xtype: 'money',
            name: 'income',
            fieldLabel: 'Monthly Income',
            minValue: 0,
            allowBlank: false,
            listeners: {
                change: 'onInputChange'
            }

        }, {
            xtype: 'money',
            name: 'expense',
            fieldLabel: 'Monthly Expenses',
            msgTarget: 'side',
            minValue: 0,
            allowBlank: false,
            listeners: {
                change: 'onInputChange'
            }
        }, {
            xtype: 'money',
            name: 'disposable',
            fieldLabel: 'Disposable Income',
            disabled: true,
            disabledCls: 'x-item-enabled'
        }],
        buttons: [{
            text: 'Invert',
            handler: 'onInvertClick'
        }, {
            text: 'Reset',
            handler: 'onResetClick'
        }]
    });

    // Pie Chart
    Ext.define('MyFiddle.BudgetChart', {
        extend: 'Ext.Panel',
        xtype: 'budget-chart',
        flex: 1,
        initComponent: function() {
            var me = this;
            me.items = [{
                xtype: 'polar',
                theme: 'default-gradients',
                width: '100%',
                height: 440,
                insetPadding: 50,
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    angleField: 'amount',
                    label: {
                        field: 'slice',
                        calloutLine: {
                            length: 60,
                            width: 3
                        }
                    },
                    //highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function(storeItem, item) {
                            this.setHtml(storeItem.get('slice') + ': $ ' + storeItem.get('amount'));
                        }
                    }
                }]
            }];

            this.callParent();
        }
    });

    // Boiler Plate
    Ext.define('MyFiddle.view.Main', {
        extend: 'Ext.panel.Panel',
        requires: ['MyFiddle.BudgetSlicer'],
        alias: 'widget.main',
        layout: {
            type: 'accordion',
            multi: true,
            hideCollapseTool: true
        },
        bodyStyle: {
            "background-color": "#88C2EA"
        },
        items: [{
            xtype: 'form-budgetslicer'
        }, {
            xtype: 'budget-chart',
            title: 'The <i>Big Picture</i>',
            fill: true
        }],
        initComponent: function() {
            var me = this;
            Ext.each(me.items, function(item) {
                item.style = {
                    backgroundColor: "#8D7C38",
                    border: "0px solid"
                };
                item.padding = 0;
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
        //border: true,
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
                border: true,
                bodyStyle: {
                    //"background-color": "#88C2EA",
                    "padding": "10px",
                    "font-weight": 'bolder'
                },
                bind: {
                    html: '{subheader}'
                }
            }],
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'main'
        }]
    });

    // Start up
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

});