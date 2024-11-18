var meta = {
    fiddleHeader: 'Itunes Top 100 Videos',
    fiddleSubHeader: 'POC that uses ExtJS to serve up the <a href="https://itunes.apple.com/us/rss/topsongs/limit=100/genre=20/explicit=true/xml" target="_blank">itunes top 100 videos rss feed</a>.  It accesses the feed via a CORS POST request to a <a href="http://12-bradyhouse.rhcloud.com/](http://12-bradyhouse.rhcloud.com/">node.js REST Service hosted on OpenShift.com</a>.  See <a href="https://github.com/bradyhouse/house/tree/master/fiddles/node/fiddle-0019-PassThruRest" target="_blank">Node POC #19</a>.' +
        '<br />',
    urls: {
        github: 'https://github.com/bradyhouse/house/tree/master/fiddles/extjs6/fiddle-0036-ItunesTop100',
        itunesRSSFeed: 'https://itunes.apple.com/us/rss/topmusicvideos/limit=100/genre=1614/explicit=true/json'
    },
    consoleTag: 'H O U S E  ~  f i d d l e s'
};


Ext.define('Fiddle.Msg', {
    requires: [
        'Ext.window.MessageBox'
    ],
    statics: {
        error: function(title, msg, fn) {
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
        question: function(title, msg, count, yFn, nFn) {
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
                fn: function(btn) {
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
        verifyResponse: function(response) {
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
}, function(Ajax) {
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
    Ext.Ajax.on('requestexception', function(conn, response, options, eOpts) {
        if (!conn.retryCount) {
            conn.retryCount = 0;
        }
        Fiddle.Msg.question(Fiddle.Ajax.verifyResponse(response), 'Do you want to retry?', conn.retryCount, function(count) {
            conn.retryCount = count;
            conn.request(options);
        });
    });
});


Ext.define('Fiddle.JsonPostProxy', {
    extend: 'Ext.data.proxy.Ajax',
    requires: [
        'Fiddle.Ajax'
    ],
    alias: 'proxy.jsonpost',
    isJsonPostProxy: true,
    config: {
        actionMethods: {
            read: 'POST'
        },
        defaultHeaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        useDefaultXhrHeader: false,
        withCredentials: false,
        cors: true,
        noCache: false,
        paramsAsJson: true,
        sortParam: false,
        timeout: 120000
    }
});


Ext.define('Fiddle.Tune', {
    extend: 'Ext.data.Model',
    fields: [{
        name: 'tag'
    }, {
        name: 'title'
    }, {
        name: 'artist'
    }, {
        name: 'category'
    }, {
        name: 'price',
        type: 'float'
    }, {
        name: 'image'
    }, {
        name: 'preview'
    }, {
        name: 'id'
    }, {
        name: 'currency'
    }, {
        name: 'link'
    }]
});


Ext.define('Fiddle.Tunes', {
    extend: 'Ext.data.Store',
    requires: [
        'Fiddle.JsonPostProxy',
        'Fiddle.Tune'
    ],
    config: {
        autoDestroy: true,
        proxy: {
            type: 'jsonpost',
            url: 'fake',
            reader: {
                type: 'json',
                rootProperty: 'feed.entry'
            }
        },
        listeners: {
            beforeload: 'onStoreBeforeLoad'
        },
        remoteSort: false,
        autoLoad: true
    },
    onStoreBeforeLoad: function(store, operation) {
        var url = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
            'http://' + window.location.hostname,
            params = {
                url: meta.urls.itunesRSSFeed,
                allowOrigin: url,
                convertToJson: false,
                allowCredentials: true,
                allowMethods: 'POST',
                allowHeaders: 'Content-Type'
            };
        encodedParams = window.encodeURIComponent(params),
            targetUrl = 'https://12-bradyhouse.rhcloud.com/passthru';
        store.proxy.setUrl(targetUrl);
        operation.setParams(params);
    },
    onProxyLoad: function(operation) {
        var me = this,
            resultSet = operation.getResultSet(),
            records = operation.getRecords(),
            successful = operation.wasSuccessful();
        if (me.destroyed) {
            return;
        }
        if (resultSet) {
            me.totalCount = resultSet.getTotal();
        }
        if (successful) {
            records = me.inflateRecords(records);
            me.loadRecords(records, operation.getAddRecords() ? {
                addRecords: true
            } : undefined);
        } else {
            me.loading = false;
        }
        if (me.hasListeners.load) {
            me.fireEvent('load', me, records, successful, operation);
        }
        me.callObservers('AfterLoad', [records, successful, operation]);
    },
    inflateRecords: function(records) {
        var inflatedRecords = [],
            i = 0;
        records.map(function(record) {
            var longTitle = record.data.title.label,
                shortTitle = longTitle.length > 30 ? longTitle.substring(1, 30) + '...' : longTitle;
            inflatedRecords.push(new Fiddle.Tune({
                tag: shortTitle,
                title: record.data.title.label,
                artist: record.data["im:artist"].label,
                category: record.data.category.attributes.label,
                price: record.data["im:price"].label,
                image: record.data["im:image"][2].label,
                preview: record.data.link[1].attributes.href,
                id: record.data.id.attributes["im:id"],
                currency: record.data["im:price"].attributes.currency,
                link: record.data.link[0].attributes.href
            }));
            i++;
        });
        return inflatedRecords;
    }
}, function() {
    /*Ext.create('Fiddle.Tunes', {
      storeId: 'tunes'
    });*/
});


Ext.define('Fiddle.DetailGrid', {
    extend: 'Ext.grid.Panel',
    requires: [
        'Fiddle.Tunes'
    ],
    xtype: 'detailgrid',
    columns: [{
        xtype: 'gridcolumn',
        dataIndex: 'title',
        text: 'Title',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'artist',
        text: 'Artist',
        flex: 1
    }, {
        xtype: 'gridcolumn',
        dataIndex: 'category',
        text: 'Category'
    }, {
        xtype: 'numbercolumn',
        width: 60,
        dataIndex: 'price',
        text: 'Price'
    }, {
        xtype: 'templatecolumn',
        tpl: [
            '<a href="{link}" target="itunes_store">',
            '    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/297733/badge_itunes-sm.gif" />',
            '</a>'
        ],
        width: 60,
        dataIndex: 'link',
        text: 'Link'
    }],
    constructor: function(config) {
        let store = Ext.data.StoreManager.lookup('tunes');
        if (store) {
            config.store = store;
        } else {
            config.store = new Fiddle.Tunes({
                storeId: 'tunes'
            });
        }
        this.callParent([config]);
    }
});


Ext.define('Fiddle.ImageGrid', {
    extend: 'Ext.panel.Panel',
    xtype: 'imagegrid',
    requires: [
        'Fiddle.Tunes'
    ],
    autoScroll: true,
    layout: {
        type: 'fit'
    },
    items: [{
        xtype: 'dataview',
        itemId: 'imagegrid',
        itemCls: 'video',
        itemSelector: 'div',
        itemTpl: [
            '<figure>',
            '    <img src="{image}" />',
            '    <figcaption title="{title}">{tag}</figcaption>',
            '</figure>'
        ],
        overItemCls: 'overvideo',
        trackOver: true
    }],
    constructor: function(config) {
        let store = Ext.data.StoreManager.lookup('tunes');
        if (store) {
            config.store = store;
        } else {
            config.store = new Fiddle.Tunes({
                storeId: 'tunes'
            });
        }
        this.callParent([config]);
    }
});


Ext.define('Fiddle.PreviewPanel', {
    extend: 'Ext.panel.Panel',
    xtype: 'previewpanel',
    itemCls: 'video',
    constructor: function(config) {
        var me = this,
            store = Ext.data.StoreManager.lookup('tunes');
        if (!store) {
            config.store = new Fiddle.Tunes({
                storeId: 'tunes'
            });
        }
        this.callParent([config]);
    },
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            tpl: [
                '<video id="videoPlayer" autoplay preload="auto" controls style="width: 100%; height: 100%; background-color: black;">',
                '    <source src="{preview}" type="video/mp4" > ',
                '</video>'
            ]
        });
        me.callParent(arguments);
        console.log('next step');
    }
});


Ext.define('Fiddle.ViewportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.viewport',
    refs: [{
        ref: 'grid',
        selector: '#grid'
    }],
    init: function(application) {
        if (window == window.top || window.innerHeight > 450) {
            this.control({
                '#grid': {
                    itemdblclick: this.onItemDblClick
                }
            });
        }
    },
    onItemDblClick: function(component, record) {
        var view = this.getView(),
            preview = view.items.items[0];
        preview.update(record.data);
    },
    onTunesStoreLoad: function(store, records, successful, operation, node) {
        var view = this.getView(),
            preview = view.items.items[0],
            firstRecord = store.data.first();
        preview.update(firstRecord);
    }
});


Ext.define('Fiddle.Viewport', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Fiddle.ViewportController',
        'Fiddle.DetailGrid',
        'Fiddle.ImageGrid',
        'Fiddle.PreviewPanel',
        'Ext.resizer.Splitter'
    ],
    controller: 'viewport',
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    items: (window.innerHeight <= 450) ? [{
        xtype: 'previewpanel',
        flex: 1,
        listeners: {
            store: {
                load: 'onTunesStoreLoad'
            }
        }
    }] : [{
        xtype: 'previewpanel',
        itemId: 'previewpanel',
        flex: 3
    }, {
        xtype: 'splitter'
    }, {
        xtype: 'detailgrid',
        itemId: 'grid',
        listeners: {
            store: {
                load: 'onTunesStoreLoad'
            }
        },
        flex: 1
    }]
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
    padding: 0,
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
    var win = Ext.create('Ext.Window', {
            title: meta.fiddleHeader,
            closable: false,
            maximizable: true,
            resizable: true,
            height: window.innerHeight - 100,
            width: window.innerWidth - 20,
            layout: 'fit',
            items: Ext.create('Fiddle.Viewport')
        }),
        positionX = 0,
        positionY = 92;

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });

    if (window.innerHeight <= 450) {
        win.showAt([positionX, positionY]).maximize(true).setZIndex(10);
    } else {
        win.showAt([positionX, positionY]);
        Ext.QuickTips.init();
        window.setTimeout(function() {
            win.maximize(true);
        }, 2500);
    }


    console.log("%c" + meta.consoleTag, 'font-style: italic; font-size: 20px;');
    console.log("%c" + meta.urls.github, "color: blue; font-style: italic; text-decoration: underline; background-color: #FFFF00;");
    console.group();

});