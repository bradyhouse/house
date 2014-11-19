Ext.onReady(function () {
    Ext.QuickTips.init();

    // Download Plugin Adapted from Ext.draw.Container
    Ext.define('App.DownloadPlugin', {
        extend: 'Ext.plugin.Abstract',
        alias: 'plugin.downloader',
        supportedFormats: ['xlsx'],
        supportedOptions: {
            version: Ext.isNumber,
            data: Ext.isString,
            format: function (format) {
                return Ext.Array.indexOf(this.supportedFormats, format) >= 0;
            },
            filename: Ext.isString,
            xlsx: Ext.isObject

        },
        init: function(parent) {
            var me = this;
            parent.on({
                download: function(url, fileName) {
                    var config = {
                        filename: fileName
                    };
                    Ext.Ajax.request({
                        url: url,
                        success: function (response, opts) {
                            var config = Ext.apply({
                                    version: 2,
                                    data: response.responseText
                                }, config);
                            me.openDownloadedFile(config);
                        },
                        failure: function (response, opts) {
                            var msg = 'Get Request for "' + url + '" failed.',
                                displayMsg = response.status ? response.status + ' - ' + msg : msg;
                            Ext.Msg.alert('Error', displayMsg);
                        }
                    });
                }
            });
        },
        xlsx: function () {
            return true;
        },
        openDownloadedFile: function (config) {
            var me = this,
                inputs = [],
                markup, name, value, html, tpl;

            html = '"{0}" href="{1}" class="nav">{2}';
            tpl = new Ext.DomHelper.createTemplate(html);

            // tpl.append('blog-roll', ['link1', 'http://www.tommymaintz.com/', "Tommy's Site"]);
            // tpl.append('blog-roll', ['link2', 'http://www.avins.org/', "Jamie's Site"]);

            for (name in config) {
                if (config.hasOwnProperty(name)) {
                    value = config[name];
                    if (name in me.supportedOptions) {
                        if (me.supportedOptions[name].call(me, value)) {
                            tpl.append('download-link', config.downloadUrl, 'Download Excel File');
                        }
                        else {
                            Ext.Msg.alert('Danger Will Robinson', 'Invalid parameter passed to file download plugin "' + name + '": ' + value);
                        }
                    }
                    else {
                        Ext.Msg.alert('Danger Will Robinson', 'Invalid image download option: "' + name + '"');
                    }
                }
            }

            markup = Ext.dom.Helper.markup({
                tag: 'html',
                children: [
                    {tag: 'head'},
                    {
                        tag: 'body',
                        children: tpl
                    }
                ]
            });
            window.open('', 'xls' + Date.now()).document.write(markup);
        }

    });

    // Fiddle ~ PlugIn Consumer
    Ext.define('App.FiddleController', {
        extend: 'Ext.app.ViewController',
        requires: ['Ext.MessageBox'],
        alias: 'controller.fiddle',
        onClickButton: function () {
            this.getView().fireEvent('download', 'ExcelExportFile.xlsx', 'Export.xlsx');
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
