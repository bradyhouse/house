Ext.define('Fiddle.View', {
    extend: 'Ext.panel.Panel',
    frame: null,
    layout: 'fit',
    items: {
        xtype: 'htmleditor',
        enableColors: true,
        enableAlignments: true,
        enableSourceEdit: true,
        enableFont: true,
        enableFontSize: true,
        enableFormat: true,
        enableLinks: true,
        enableLists: true
    }
});

Ext.onReady(function () {

    var fiddleHeader = 'Simple Fiddle ~ HTML Editor',
        fiddleSubHeader = 'Fiddle exploring the <b><a href="http://docs-origin.sencha.com/extjs/5.1/5.1.0-apidocs/source/HtmlEditor.html#Ext-form-field-HtmlEditor" target="_blank">Ext.form.field.HtmlEditor</a></b> class.' +
            '<br />',
        fiddle = Ext.create('Fiddle.View'),
        win = Ext.create('Ext.Window', {
            title: fiddleHeader,
            closable: false,
            height: 500,
            width: 700,
            layout: 'fit',
            items: fiddle
        }),
        positionX = 25,
        positionY = 100;

    win.showAt([positionX, positionY]);

    // Boiler Plate
    Ext.QuickTips.init();
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
