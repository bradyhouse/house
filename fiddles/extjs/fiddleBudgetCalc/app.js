Ext.onReady(function () {
    var deleteIconLink = 'http://dev.sencha.com/ext/5.0.1/examples/kitchensink/resources/images/icons/fam/delete.gif',
        kitchenSinkForkLink = 'http://dev.sencha.com/ext/5.0.0/examples/kitchensink/#cell-editing',
        fiddleHeader = '<i>Budget Calculator</i>',
        defaultMonthlyNumbers = {
            income: 0.00,
            expense: 0.00
        };

    // Fiddle #1 ~ Monthly Nut Editor
    Ext.define('MyFiddle.Money', {
        extend: 'Ext.form.field.Number',
        alias: 'widget.money',
        regex: /^\d{0,5}(\.\d{1,2})?$/,
        regexText: 'Enter a valid dollar amount',
        formatter: 'usMoney',
        step: 1000,
        msgTarget: 'side'
    });
    Ext.define('MyFiddle.MonthlyNut', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'income',
            type: 'number'
        }, {
            name: 'expense',
            type: 'number'
        }, {
            name: 'disposable',
            convert: function (value, record) {
                return record.data.income - record.data.expense;
            }
        }]
    });
    Ext.define('MyFiddle.MonthlyNutController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.fiddle-monthly-nut-editor',
        requires: ['MyFiddle.MonthlyNut', 'Ext.util.DelayedTask'],
        onRender: function () {
            consoleLog('onRender');
            var me = this,
                delayedTask = new Ext.util.DelayedTask(function () {
                    me.loadDefaultValues();
                });
            delayedTask.delay(500);
        },
        onLoadClick: function () {
            consoleLog('onLoadClick');
            this.loadDefaultValues();
        },
        onResetClick: function () {
            consoleLog('onResetClick');
            this.loadDefaultValues();
        },
        onIncomeChange: function () {
            consoleLog('onIncomeChange');
            this.updateStore();
        },
        onExpenseChange: function () {
            consoleLog('onExpenseChange');
            this.updateStore();
        },
        onUpdateAggregates: function () {
            indentConsoleLog('updateAggregates');
            var me = this,
                form = this.getView(),
                incomeInput = form.down('money[name=income]').getValue(),
                expenseInput = form.down('money[name=expense]').getValue(),
                aggregates = form.up('panel').down('fiddle-aggregates'),
                disposableCalc = incomeInput - expenseInput;
            aggregates.viewModel.setData({
                income: incomeInput,
                expenses: expenseInput,
                disposable: disposableCalc
            });
            aggregates.fireEvent('reformat');
        },
        // @private
        updateStore: function () {
            indentConsoleLog('updateStore');
            var me = this,
                form = this.getView(),
                incomeInput = form.down('money[name=income]').getValue(),
                expenseInput = form.down('money[name=expense]').getValue(),
                disposableCalc = form.down('money[name=disposable]').getValue(),
                expenseEditor = form.up('panel').down('fiddle-expense-editor'),
                aggregates = form.up('panel').down('fiddle-aggregates'),
                delayedTask = new Ext.util.DelayedTask(function () {
                    me.loadFormRecord(incomeInput,
                        expenseInput);
                    if (expenseEditor) {
                        indentConsoleLog('formupdated!');
                        expenseEditor.fireEvent('formupdated');
                    }
                    form.fireEvent('updateaggregates');
                });
            if (!form.isLayoutSuspended() && form.isValid()) {
                delayedTask.delay(200);
            }
        },
        // @private
        loadDefaultValues: function () {
            consoleLog('loadDefaultValues');
            this.loadFormRecord(defaultMonthlyNumbers.income, defaultMonthlyNumbers.expense);
        },
        // @private
        loadFormRecord: function (inc, exp) {
            consoleLog('loadFormRecord');
            var me = this,
                form = me.getView();
            form.suspendLayouts();
            form.loadRecord(Ext.create('MyFiddle.MonthlyNut', {
                'income': inc,
                'expense': exp
            }));
            form.resumeLayouts();
        }
    });
    Ext.define('MyFiddle.MonthlyNutEditor', {
        extend: 'Ext.form.Panel',
        xtype: 'fiddle-monthly-nut-editor',
        requires: ['MyFiddle.Money'],
        controller: 'fiddle-monthly-nut-editor',
        title: 'Monthly <i>Nut</i>',
        flex: 1,
        listeners: {
            render: 'onRender',
            updateaggregates: 'onUpdateAggregates'
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
            padding: '10',
            allowBlank: false,
            listeners: {
                change: 'onIncomeChange'
            }
        }, {
            xtype: 'money',
            name: 'expense',
            fieldLabel: 'Monthly Expenses',
            padding: '10',
            msgTarget: 'side',
            minValue: 0,
            disabled: true,
            disabledCls: 'x-item-enabled',
            listeners: {
                'change': 'onExpenseChange'
            },
            hidden: true
        }, {
            xtype: 'money',
            name: 'disposable',
            padding: '10',
            fieldLabel: 'Disposable Income',
            disabled: true,
            disabledCls: 'x-item-enabled',
            hidden: true
        }],
        buttons: [{
            text: 'Reset',
            handler: 'onResetClick'
        }]
    });

    // Fiddle #2 ~ Expense Editor
    Ext.define('MyFiddle.Budget', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'item',
            type: 'string'
        }, {
            name: 'amount',
            type: 'float'
        }]
    });
    Ext.define('MyFiddle.ExpenseController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.fiddle-expense-editor',
        requires: ['MyFiddle.Budget'],
        onFormUpdated: function () {
            this.bindChart();
        },
        onBeforeStateRestore: function () {
            consoleLog('onBeforeStateRestore');
            if (this.getView().isLayoutSuspended()) {
                return false;
            }
        },
        onDataChanged: function () {
            consoleLog('onDataChanged');
            this.bindChart();
        },
        onCellEdit: function (editor, e) {
            consoleLog('onCellEdit');
            this.bindChart();
        },
        onAfterLayout: function () {
            consoleLog('onAfterLayout');
            var me = this,
                view = me.getView(),
                store = view.getStore();
            delayedTask = new Ext.util.DelayedTask(function () {
                view.loadStore();
                me.bindChart();
            });
            delayedTask.delay(300);
        },
        onResetClick: function () {
            consoleLog('onRemoveClick');
            var me = this;
            me.getView().getStore().removeAll();
            me.bindChart();
        },
        onAddClick: function () {
            consoleLog('onAddClick');
            var me = this.getView(),
                rec = new MyFiddle.Budget({
                    item: '',
                    amount: 0.0
                });
            me.getStore().insert(0, rec);
            me.cellEditing.startEditByPosition({
                row: me.getStore().count() - 1,
                column: 0
            });
        },
        onRemoveClick: function (grid, rowIndex) {
            consoleLog('onRemoveClick');
            var me = this;
            this.getView().getStore().removeAt(rowIndex);
            me.bindChart();
        },
        // @private
        bindChart: function () {
            consoleLog('bindChart');
            // ToDo - Refactor into multiple functions
            var me = this,
                grid = me.getView(),
                expenseChartContainer = grid ? grid.up('panel').down('fiddle-expense-chart') : null,
                expenseChart = expenseChartContainer ? expenseChartContainer.down('polar') : null,
                nutChartContainer = grid ? grid.up('panel').down('fiddle-monthlynut-chart') : null,
                nutChart = nutChartContainer ? nutChartContainer.down('polar') : null,
                form = grid.up('panel').down('fiddle-monthly-nut-editor'),
                incomeField = form ? form.down('money[name=income]') : null,
                income = incomeField ? incomeField.getValue() : 0,
                totalExpensesField = form ? form.down('money[name=expense]') : null,
                totalExpenses = 0,
                expenses = grid.getStore().data.items,
                fieldArr = ['slice', 'amount'],
                expensesDataArr = [],
                nutDataArr = [];
            me.updateExpenseTotal();
            totalExpenses = totalExpensesField ? totalExpensesField.getValue() : 0;
            if (nutChart) {
                nutDataArr.push({
                    slice: 'Income',
                    amount: income
                }, {
                    slice: 'Expenses',
                    amount: totalExpenses
                });
                nutChart.bindStore({
                    fields: fieldArr,
                    data: nutDataArr
                });
                nutChart.redraw();
            }
            if (expenseChart) {
                Ext.Array.forEach(expenses, function (expense) {
                    expensesDataArr.push({
                        slice: expense.data.item,
                        amount: expense.data.amount
                    });
                });
                expenseChart.bindStore({
                    fields: fieldArr,
                    data: expensesDataArr
                });
                expenseChart.redraw();
            }
            form.fireEvent('updateaggregates');
        },
        // @private
        updateExpenseTotal: function () {
            consoleLog('updateExpenseTotal');
            var me = this,
                view = me.getView(),
                form = view ? view.up('panel').down('fiddle-monthly-nut-editor') : null,
                expenseField = form ? form.down('money[name=expense]') : null,
                expenseTotal = view.calcTotalExpenses();
            indentConsoleLog('expenseTotal');
            indentConsoleLog(expenseTotal);
            expenseField.setValue(expenseTotal);
        }
    });
    Ext.define('MyFiddle.ExpenseEditor', {
        extend: 'Ext.grid.Panel',
        requires: ['Ext.selection.CellModel', 'Ext.grid.*', 'Ext.data.*', 'Ext.util.*', 'Ext.form.*', 'MyFiddle.Budget', 'MyFiddle.ExpenseController'],
        xtype: 'fiddle-expense-editor',
        title: 'Expenses',
        stateEvents: ['add', 'remove', 'edit', 'formupdated'],
        stateful: true,
        stateId: 'fiddle-expenses',
        saveDelay: 1000,
        flex: 1,
        controller: 'fiddle-expense-editor',
        listeners: {
            afterlayout: {
                fn: 'onAfterLayout',
                delay: 3,
                single: true
            },
            beforestaterestore: 'onBeforeStateRestore',
            edit: 'onCellEdit',
            removeclick: 'onRemoveClick',
            formupdated: 'onFormUpdated'
        },
        initComponent: function () {
            consoleLog('initComponent');
            var me = this;
            // Suspend Layout to prevent persistence
            // from being over written on start-up
            me.suspendLayouts();
            Ext.apply(me, {
                plugins: me.inflatePlugins(),
                store: me.inflateStore(),
                columns: me.inflateColumns(),
                selModel: me.inflateSelModel(),
                buttons: me.inflateButtons()
            });
            me.callParent();
            me.mindTouchSupport();
            me.resumeLayouts();

        },
        getState: function () {
            consoleLog('getState');
            var me = this,
                data = me.getStore().data,
                rows = [],
                form = me.up('panel').down('fiddle-monthly-nut-editor'),
                incomeField = form ? form.down('money[name=income]') : null,
                expenseField = form ? form.down('money[name=expense]') : null,
                incomeInput = incomeField ? incomeField.getValue() : 0,
                expenseTotal = me.calcTotalExpenses(),
                state = {};

            indentConsoleLog('incomeField.getValue()');
            indentConsoleLog(incomeField ? incomeField.getValue() : null);
            indentConsoleLog('expenseField');
            indentConsoleLog(expenseField ? expenseField.getValue() : null);

            Ext.Array.forEach(data.items, function (item) {
                rows.push({
                    item: item.data.item,
                    amount: item.data.amount
                })
            });
            indentConsoleLog('rows');
            indentConsoleLog(rows);
            state = {
                income: incomeInput,
                totalExpenses: expenseTotal,
                disposable: incomeInput - expenseTotal,
                expenseSlices: rows
            };
            indentConsoleLog('state');
            indentConsoleLog(state);
            return state;
        },
        applyState: Ext.emptyFn,
        // @private
        calcTotalExpenses: function () {
            indentConsoleLog('calcTotalExpenses');
            var me = this,
                total = 0.0;
            Ext.Array.forEach(me.getStore().data.items, function (item) {
                total += item.data.amount;
            });
            indentConsoleLog('total = ' + total);
            return total;
        },
        // @private
        mindTouchSupport: function () {
            indentConsoleLog('mindTouchSupport');
            if (Ext.supports.Touch) {
                this.addDocked({
                    xtype: 'header',
                    title: '<b>Note that cell editing is not recommeded on keyboardless touch devices.</b>'
                });
            }
        },
        // @private
        inflateButtons: function () {
            indentConsoleLog('inflateButtons');
            return [{
                text: 'Add Item',
                handler: 'onAddClick'
            }, {
                text: 'Reset',
                handler: 'onResetClick'
            }];
            /*return [{
             text: 'Add Item',
             scope: this,
             listeners: {
             'click': 'onAddClick'
             }
             }];*/
        },
        // @private
        inflateSelModel: function () {
            indentConsoleLog('inflateSelModel');
            return {
                selType: 'cellmodel'
            };
        },
        // @private
        inflateColumns: function () {
            var me = this;
            indentConsoleLog('inflateColumns');
            return [{
                header: 'Item',
                dataIndex: 'item',
                flex: 1,
                editor: {
                    allowBlank: false
                }
            }, {
                header: 'Amount',
                dataIndex: 'amount',
                formatter: 'usMoney',
                editor: {
                    allowBlank: false
                }
            }, {
                xtype: 'actioncolumn',
                width: 30,
                sortable: false,
                menuDisabled: true,
                items: [{
                    icon: deleteIconLink,
                    tooltip: 'Delete item',
                    handler: function (grid, rowIndex) {
                        me.fireEvent('removeclick', grid, rowIndex);
                    }
                }]
            }];
        },
        // @private
        inflatePlugins: function () {
            indentConsoleLog('inflatePlugins');
            this.cellEditing = new Ext.grid.plugin.CellEditing({
                clicksToEdit: 1
            });
            return [this.cellEditing];
        },
        // @private
        inflateStore: function () {
            indentConsoleLog('inflateStore');
            var myStateId = this.getStateId();
            return new Ext.data.Store({
                autoDestroy: true,
                model: MyFiddle.Budget,
                proxy: {
                    type: 'ajax',
                    url: 'data.json',
                    reader: {
                        type: 'json'
                    }
                },
                sorters: [{
                    property: 'id',
                    direction: 'ASC'
                }]
            })
        },
        // @private
        loadStore: function () {
            indentConsoleLog('loadStore');
            var me = this,
                id = me.getStateId(),
                form = me.up('panel').down('fiddle-monthly-nut-editor'),
                incomeField = form ? form.down('money[name=income]') : null,
                expenseField = form ? form.down('money[name=expense]') : null,
                state,
                rec;
            if (id) {
                state = Ext.state.Manager.get(id);
                if (!Ext.isEmpty(state)) {
                    Ext.Array.forEach(state.expenseSlices, function (expenseSlice) {
                        rec = new MyFiddle.Budget({
                            item: expenseSlice.item,
                            amount: expenseSlice.amount
                        });
                        me.getStore().insert(0, rec);
                    });
                    form.suspendLayouts();
                    incomeField.setValue(state.income);
                    expenseField.setValue(state.totalExpenses);
                    form.resumeLayouts();
                } else {
                    this.getStore().load();
                }
            }
        }
    });

    // Fiddle #3 ~ Charts
    Ext.define('MyFiddle.ExpenseChart', {
        extend: 'Ext.Panel',
        xtype: 'fiddle-expense-chart',
        flex: 1,
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'polar',
                theme: 'blue-gradients',
                width: '100%',
                height: 200,
                insetPadding: 20,
                innerPadding: 20,
                /*legend: {
                 docked: 'right'
                 },*/
                sprites: [{
                    type: 'text',
                    text: 'Expenses',
                    font: '15px Helvetica',
                    width: 100,
                    height: 20,
                    x: 18, // the sprite x position
                    y: 20 // the sprite y position
                }],
                interactions: ['rotate', 'itemhighlight'],
                series: [{
                    type: 'pie',
                    angleField: 'amount',
                    label: {
                        field: 'slice',
                        fontSize: '11px',
                        calloutLine: {
                            length: 30,
                            width: 1
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (storeItem, item) {
                            this.setHtml(storeItem.get('slice') + ': $ ' + storeItem.get('amount'));
                        }
                    }
                }]
            }];
            this.callParent();
        }
    });
    Ext.define('MyFiddle.MonthlyNutChart', {
        extend: 'Ext.Panel',
        xtype: 'fiddle-monthlynut-chart',
        flex: 1,
        initComponent: function () {
            var me = this;
            me.items = [{
                xtype: 'polar',
                theme: 'default-gradients',
                width: '100%',
                height: 200,
                insetPadding: 20,
                innerPadding: 20,
                interactions: ['rotate', 'itemhighlight'],
                sprites: [{
                    type: 'text',
                    text: 'Income vs. Expenses',
                    font: '15px Helvetica',
                    width: 100,
                    height: 20,
                    x: 18, // the sprite x position
                    y: 20 // the sprite y position
                }],
                series: [{
                    type: 'pie',
                    angleField: 'amount',
                    label: {
                        field: 'slice',
                        fontSize: '11px',
                        calloutLine: {
                            length: 30,
                            width: 1
                        }
                    },
                    highlight: true,
                    tooltip: {
                        trackMouse: true,
                        renderer: function (storeItem, item) {
                            this.setHtml(storeItem.get('slice') + ': $ ' + storeItem.get('amount'));
                        }
                    }
                }]
            }];
            this.callParent();
        }
    });

    // Fiddle #4 ~ Aggregates
    Ext.define('MyFiddle.AggregatesController', {
        extend: 'Ext.app.ViewController',
        alias: 'controller.fiddle-aggregates',
        onReformat: function () {
            consoleLog('onReformat');
            var me = this,
                view = me.getView(),
                model = view.viewModel,
                disposable = view.viewModel.getData().disposable,
                disposableLabel = view.down('#disposableIncome');

            if (disposable < 0) {
                indentConsoleLog('disposable < 0');
                indentConsoleLog('Candy Apple Red');
                model.setData({
                    color: '#FF0800'
                });
            } else {
                indentConsoleLog('disposable > 0');
                indentConsoleLog('Black')
                model.setData({
                    color: '#ffffff'
                });
            }
        }
    });
    Ext.define('MyFiddle.AggregatesModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.fiddle-aggregates',
        data: {
            color: '#66FF00',
            expenses: 0,
            income: 0,
            disposable: 0
        }
    });
    Ext.define('MyFiddle.Aggregates', {
        extend: 'Ext.panel.Panel',
        xtype: 'fiddle-aggregates',
        requires: ['MyFiddle.AggregatesModel', 'MyFiddle.AggregatesController'],
        controller: 'fiddle-aggregates',
        viewModel: {
            type: 'fiddle-aggregates'
        },
        title: 'Aggregates',
        header: {
            style: {
                display: 'none'
            }
        },
        items: [{
            xtype: 'panel',
            bind: {
                bodyStyle: {
                    "background-color": "#000000",
                    "padding": "10px",
                    "font-weight": "bolder",
                    "font-family": "Times",
                    "font-size": "1.5em",
                    "line-height": "1.2em",
                    "color": '#ffffff',
                    "padding-top": ".5em"
                }
            },
            layout: {
                type: 'hbox',
                align: 'left'
            },
            items: [{
                xtype: 'label',
                forId: 'totalExpenses',
                text: 'Total Expenses:',
                margin: '0 10 0 10'
            }, {
                xtype: 'label',
                itemId: 'totalExpenses',
                bind: {
                    html: '<i>{expenses:usMoney}</i>'
                }
            }, {
                xtype: 'label',
                html: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;'
            }, {
                xtype: 'label',
                forId: 'disposableIncome',
                text: 'Disposable Income:',
                margin: '0 10 0 10'
            }, {
                xtype: 'label',
                itemId: 'disposableIncome',
                bind: {
                    html: '<div style="color: {color};"><i>{disposable:usMoney}</i></div>'
                }
            }]
        }],
        listeners: {
            reformat: 'onReformat'
        }
    });

    // Boiler Plate
    function consoleLog(msg) {
        return;
        var now = new Date();
        Ext.log({}, Ext.Date.format(now, 'U') + ' |    ' + msg);
    }

    function indentConsoleLog(msg) {
        consoleLog('    ' + msg);
    }

    Ext.define('MyFiddle.StateManager', {
        requires: ['Ext.state.Manager', 'Ext.state.LocalStorageProvider']
    }, function () {
        Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider({
            prefix: 'MyFiddle-'
        }));
    });
    Ext.define('MyFiddle.Scaffold', {
        extend: 'Ext.panel.Panel',
        requires: ['MyFiddle.MonthlyNutEditor', 'MyFiddle.ExpenseEditor', 'MyFiddle.ExpenseChart', 'MyFiddle.MonthlyNutChart', 'MyFiddle.Aggregates'],
        alias: 'widget.scaffold',
        bodyStyle: {
            "background-color": "#000000"
        },
        layout: {
            type: 'accordion',
            multi: true,
            hideCollapseTool: true
        },
        items: [{
            xtype: 'fiddle-monthly-nut-editor'
        }, {
            xtype: 'fiddle-expense-editor'
        }, {
            xtype: 'panel',
            title: 'The <i>Big Picture</i>',
            fill: true,
            layout: 'hbox',
            items: [{
                xtype: 'fiddle-monthlynut-chart',
                padding: '5 5 5 0',
                flex: 1,
                style: {
                    backgroundColor: "#D2E7F7"
                }
            }, {
                xtype: 'fiddle-expense-chart',
                padding: '5 0 5 5',
                flex: 1,
                style: {
                    backgroundColor: "#D2E7F7"
                }
            }]
        }, {
            xtype: 'fiddle-aggregates'
        }]
    });
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            header: fiddleHeader
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            items: [{
                xtype: 'panel',
                bodyStyle: {
                    "background-color": "#000000",
                    "padding": "10px",
                    "font-weight": "bolder",
                    "font-family": "Times",
                    "font-size": "2em",
                    "line-height": "1.5em",
                    "color": "#ffffff"
                },
                bind: {
                    html: '{header}'
                }
            }],
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'scaffold'
        }]
    });
    // Start up
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});