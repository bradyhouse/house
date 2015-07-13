var meta = {
    fiddleHeader: 'Message Box Variations',
    fiddleSubHeader: 'Fiddle exploring the <a href="http://docs.sencha.com/extjs/5.1/5.1.0-apidocs/#!/api/Ext.MessageBox" target="_blank">Ext.Msg</a> class. ' + '<br />'
};

Ext.define('Fiddle.Msg', {
    requires: ['Ext.window.MessageBox'],
    statics: {
        showError: function(title, msg, ismodal, fn) {
            var Msg = Ext.Msg;
            Msg.resizable = true;
            Msg.show({
                title: title,
                message: msg,
                modal: ismodal,
                buttons: Msg.OK,
                icon: Msg.ERROR,
                width: 300,
                fn: fn
            });
        },
        showModalInfo: function(title, msg, fn) {
            var Msg = Ext.Msg;
            Msg.resizable = true;
            Msg.show({
                title: title,
                message: msg,
                modal: true,
                buttons: Msg.OK,
                icon: Msg.INFO,
                width: 300,
                fn: fn
            });
        },
        showModalWarning: function(title, msg, fn) {
            var Msg = Ext.Msg;
            Msg.resizable = true;
            Msg.show({
                title: title,
                message: msg,
                modal: true,
                buttons: Msg.OK,
                icon: Msg.WARNING,
                width: 300,
                fn: fn
            });
        },
        showModalQuestion: function(title, msg, count, fn) {
            var Msg = Ext.Msg,
                dialogTitle = count > 0 ? title + ' (' + count + ')' : title,
                rc = count + 1;
            Msg.resizable = true;
            Msg.show({
                title: dialogTitle,
                message: msg,
                modal: true,
                buttons: Msg.YESNO,
                icon: Msg.QUESTION,
                width: 300,
                fn: function(btn) {
                    if (Ext.isFunction(fn)) {
                        switch (btn) {
                            case 'yes':
                                fn(rc);
                                break;
                            default:
                                fn(0);
                                break;
                        }
                    }
                }
            });
        },
        promptModalMultiLineText: function(fn) {
            var Msg = Ext.Msg;
            Msg.resizable = true;
            Msg.defaultTextHeight = 150;
            Msg.defaultWidth = 500;
            Ext.Msg.prompt('Multiline Input Prompt', 'Please enter some gibberish:<br/>', function(btn, text) {
                if (btn == 'ok') {
                    if (Ext.isFunction(fn)) {
                        fn(text);
                    }
                }
            }, this, true, '');
        },
        showModalYesNoCancel: function(title, count, fn) {
            var Msg = Ext.Msg,
                dialogTitle = count > 0 ? title + ' (' + count + ')' : title,
                rc = count + 1;

            Msg.resizable = true;
            Msg.show({
                title: dialogTitle,
                message: 'Hickup! Would you like to try again?',
                buttons: Msg.YESNOCANCEL,
                icon: Msg.QUESTION,
                width: 300,
                fn: function() {
                    if (Ext.isFunction(fn)) {
                        switch (btn) {
                            case 'yes':
                                fn(rc);
                                break;
                            default:
                                fn(0);
                                break;
                        }
                    }
                }
            });
        }
    }
});
Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    config: {
        count: 0,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        id: 'fiddleView',
        items: [{
            xtype: 'button',
            text: 'Error Msg',
            handler: function() {
                Fiddle.Msg.showError('Modal Error', 'All error messages should be modal.', false, Ext.emptyFn);
            }
        }, {
            xtype: 'button',
            text: 'Modal Error Msg',
            handler: function() {
                Fiddle.Msg.showError('Modal Error', 'Fiddle undefined.', true, Ext.emptyFn);
            }
        }, {
            xtype: 'button',
            text: 'Modal Info',
            handler: function() {
                Fiddle.Msg.showModalInfo('Modal Info', 'The square root of 49 is 7.', Ext.emptyFn);
            }
        }, {
            xtype: 'button',
            text: 'Modal Warning',
            handler: function() {
                Fiddle.Msg.showModalWarning('Modal Warning', 'You know nothing John Snow!', Ext.emptyFn);
            }
        }, {
            xtype: 'button',
            id: 'btnModalQuestion',
            text: '<b>Modal Question</b>',
            listeners: {
                click: function() {
                    var view = Ext.ComponentQuery.query('#fiddleView')[0],
                        lastCount = view.getCount();
                    Fiddle.Msg.showModalQuestion('Retry', 'Nope! Would you like to try again?', lastCount, function(newCount) {
                        var btn = Ext.ComponentQuery.query('#btnModalQuestion')[0],
                            task = new Ext.util.DelayedTask(function() {
                                btn.fireEvent('click', [btn]);
                            });
                        view.setCount(newCount);
                        if (newCount > 0) {
                            task.delay(500);
                        }
                    });
                }
            }
        }, {
            xtype: 'button',
            id: 'btnModalPrompt',
            text: 'Modal Multiline Prompt',
            listeners: {
                click: function() {
                    Fiddle.Msg.promptModalMultiLineText(function(value) {
                        if (value) {
                            Fiddle.Msg.showModalInfo('Modal Info', 'You entered: <br/>' + value, Ext.emptyFn);
                        } else {
                            Fiddle.Msg.showModalError('Modal Error', 'Hey now! Where\'s my gibberish', Ext.emptyFn);
                        }
                    });
                }
            }
        }, {
            xtype: 'button',
            id: 'btnModalYesNoCancel',
            text: 'Modal Yes/No/Cancel',
            listeners: {
                click: function() {
                    var view = Ext.ComponentQuery.query('#fiddleView')[0],
                        lastCount = view.getCount();
                    Fiddle.Msg.showModalYesNoCancel('Modal Yes/No/Cancel', lastCount, function(newCount) {
                        var btn = Ext.ComponentQuery.query('#btnModalYesNoCancel')[0],
                            task = new Ext.util.DelayedTask(function() {
                                btn.fireEvent('click', btn);
                            });
                        view.setCount(newCount);
                        if (newCount > 0) {
                            task.delay(200);
                        }
                    });
                }
            }
        }

        ]
    }

});
// Boiler plate
Ext.define('App.BoxModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.box',
    data: {
        header: meta.fiddleHeader,
        subheader: meta.fiddleSubHeader
    }
});
Ext.define('App.Box', {
    extend: "Ext.container.Container",
    border: true,
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
    }]
});
Ext.onReady(function() {
    var fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            height: 270,
            width: 300,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 125;
    win.showAt([positionX, positionY]);
    Ext.QuickTips.init();

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
