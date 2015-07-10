var fiddleHeader = 'Ajax Retry Pop-Up',
    fiddleSubHeader = '<i>Fiddle exploring how to display a pop-up Yes/No dialog when an Ajax call fails (or times out).  If the user clicks "Yes", the connection request is re-attempted. </i>';

Ext.define('Fiddle.Msg', {
    requires: [
        'Ext.window.MessageBox'
    ],
    statics: {
        error: function (title, msg, fn) {
            var Msg = Ext.Msg;
            Msg.resizable = true;
            Msg.show({
                title: title,
                message: msg,
                modal: true,
                buttons: Msg.OK,
                icon: Msg.ERROR,
                width: 300,
                fn: fn
            });
        },
        question: function (title, msg, count, yFn, nFn) {
            var Msg = Ext.Msg,
                dialogTitle = count > 0 ? title + ' (' + count + ')' : title,
                rc = count + 1;
            Msg.resizable = true;
            Msg.show({
                title: dialogTitle,
                message: msg,
                modal: false,
                buttons: Msg.YESNO,
                icon: Msg.QUESTION,
                closable: false,
                width: 300,
                fn: function (btn) {
                    switch (btn) {
                        case 'yes':
                            if (Ext.isFunction(yFn)) {
                                yFn(rc);
                            }
                            break;
                        default:
                            if (Ext.isFunction(nFn)) {
                                nFn(rc);
                            }
                            break;
                    }
                }
            });
        }
    }
});
Ext.define('Fiddle.Ajax', {
    requires: [
        'Ext.Ajax',
        'Fiddle.Msg'
    ],
    statics: {
        verifyResponse: function (response) {
            var respText;
            if (Ext.isObject(response)) {
                respText = response.responseText;
                switch (response.status) {
                    case 401:
                    case 403:
                    case 404:
                    case 408:
                    case 500:
                        return "HTTP " + response.status + ' Error';
                        break;
                    default:
                        return 'Unknown HTTP Error';
                        break;
                }
            } else {
                return 'Unknown server error.';
            }
        }
    }
}, function (Ajax) {
    Ext.Ajax.setConfig({
        defaultHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        defaultPostHeader: 'application/json',
        useDefaultXhrHeader: false,
        withCredentials: true,
        cors: true,
        timeout: 120000
    });
    Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
        if (!conn.retryCount) {
            conn.retryCount = 0;
        }
        Fiddle.Msg.question(Fiddle.Ajax.verifyResponse(response), 'Do you want to retry?', conn.retryCount, function (count) {
            conn.retryCount = count;
            conn.request(options);
        });
    });
});
Ext.onReady(function () {
    var store = Ext.create('Ext.data.Store', {
        autoDestroy: true,
        proxy: {
            type: 'ajax',
            url: 'data.json',
            reader: {
                type: 'json',
                rootProperty: 'data',
                idProperty: '_id',
                totalProperty: 'total'
            }
        }
    });
    store.load();
    // Boiler Plate
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
        border: true,
        padding: 25,
        viewModel: {
            type: 'box'
        },
        items: [
            {
                xtype: 'panel',
                bind: {
                    title: '{header}'
                },
                items: [
                    {
                        xtype: 'panel',
                        padding: 10,
                        border: false,
                        bind: {
                            html: '{subheader}'
                        }
                    }
                ],
                region: 'north'
            }
        ]
    });
    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
