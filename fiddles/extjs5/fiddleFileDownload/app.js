Ext.onReady(function () {

    // Change the variable to simulate a phishing attack
    var serverUrl = 'http://houseknecht.com/2014/labs/xlsx/ExcelExportFile.xlsx';

    // Download Plugin ~ Adapted from the Ext.draw.Container download method
    Ext.define('App.DownloadPlugin', {
        extend: 'Ext.plugin.Abstract',
        alias: 'plugin.downloader',
        requires: [
            'Ext.dom.Helper'
        ],
        init: function(parent) {
            var me = this;
            parent.on({
                download: function (url, format) {
                    var config = {
                        downloadUrl: url,
                        downloadFormat: format

                    };
                    me.openDownloadLinkWindow(config);
                }
            });
        },
        // @private
        supportedServerDomain: 'http://houseknecht.com',
        // @private
        supportedFormats: ['xlsx'],
        // @private
        supportedOptions: {
            downloadUrl: Ext.isString,
            downloadFormat: function (format) {
                return Ext.Array.indexOf(this.supportedFormats, format) >= 0;
            },
            xlsx: this.xlsx
        },
        // @private
        xlsx: function () {
            return true;
        },
        // @private
        openDownloadLinkWindow: function (config) {
            var me = this,
                inputs = [],
                linkIndex = 1,
                markup, name, value, linkHtml, jsHtml, linkId;
            if (!Ext.String.startsWith(config.downloadUrl, me.supportedServerDomain, true) ||
                !Ext.String.endsWith(config.downloadUrl, me.supportedFormats[0])) {
                Ext.Msg.alert('Danger Will Robinson!!!', 'Invalid download url requested');
                return;
            }
            inputs.push('<BR/>');
            for (name in config) {
                if (config.hasOwnProperty(name)) {
                    value = config[name];
                    if (name in me.supportedOptions) {
                        linkId = 'link' + linkIndex;
                        jsHtml = 'window.setTimeout(function() {document.getElementById(\'' + linkId +'\').style.display=\'none\';},100);';
                        console.log(jsHtml);
                        linkHtml = '<a id="' + linkId + '" href="' + config.downloadUrl +'" onclick="' + jsHtml  +'">Download Excel File</a>';
                        console.log(linkHtml);
                        if (me.supportedOptions[name].call(me, value)) {
                            if (!Ext.Array.contains(inputs, linkHtml)) {
                                inputs.push(linkHtml);
                            }
                        }
                        else {
                            Ext.Msg.alert('Danger Will Robinson!!!', 'Invalid parameter passed to file download plugin "' + name + '": ' + value);
                            return;
                        }
                    }
                    else {
                        Ext.Msg.alert('Danger Will Robinson!!', 'Invalid image download option: "' + name + '"');
                        return;
                    }
                }
            }
            markup = me.assembleMarkup(inputs);
            if (markup) {
                me.openDownloadWindow(markup);
            }
        },
        // @private
        assembleMarkup: function (htmlPieces) {
            var result;
            try {
                result = Ext.dom.Helper.markup({
                    tag: 'html',
                    children: [
                        {tag: 'head',
                            children: ['<title>Excel Download</title>']
                        },
                        {
                            tag: 'body',
                            children: htmlPieces
                        }
                    ]
                });
            } catch (err) {
                Ext.Msg.alert('Danger Will Robinson!!', 'Ext.dom.Helper.markup generated the following error: "' + err + '"');
            }
            return result;
        },
        openDownloadWindow: function (markup) {
            window.open('', 'xls' + Date.now()).document.write(markup);
        }
    });

    // Fiddle ~ PlugIn Consumer
    Ext.define('App.FiddleController', {
        extend: 'Ext.app.ViewController',
        requires: ['Ext.MessageBox'],
        alias: 'controller.fiddle',
        onClickButton: function () {
            this.getView().fireEvent('download', serverUrl, 'xlsx');
        }
    });
    Ext.define('App.Fiddle', {
        extend: 'Ext.panel.Panel',
        requires: ['App.FiddleController',
            'App.DownloadPlugin'
        ],
        alias: 'widget.fiddle',
        controller: 'fiddle',
        plugins: [{
            ptype: 'downloader'
        }],
        items: [{
                xtype: 'button',
                text: 'Click Here',
                handler: 'onClickButton',
                flex: 1
            }]
    });

    // Boiler Plate
    Ext.define('App.BoxModel', {
        extend: 'Ext.app.ViewModel',
        alias: 'viewmodel.box',
        data: {
            name: 'Fiddle exploring how to create "phishing" safe, binary file download link.'
        }
    });
    Ext.define('App.Box', {
        extend: "Ext.container.Container",
        border:	true,
        padding: 10,
        viewModel: {
            type: 'box'
        },
        items: [{
            xtype: 'panel',
            bind: {
                title: '{name}'
            },
            region: 'north'
        }, {
            type: 'panel',
            region: 'center',
            xtype: 'fiddle'
        }]
    });

    Ext.create('App.Box', {
        renderTo: Ext.getBody()
    });
});
