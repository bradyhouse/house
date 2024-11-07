var meta = {
    fiddleHeader: 'ExtJS ~ Calculator',
    fiddleSubHeader: 'Fiddle exploring how to model a standard calculator.' +
    '<br />'
};

Ext.application({
    name: 'Calculator',
    launch: function () {

        Ext.define('Face', {
            extend: 'Ext.Panel',
            id: 'panelFace',
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'textfield',
                    reference: 'display',
                    layout: {
                        type: 'fit',
                        align: 'stretch'
                    },
                    height: 60

                }, {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                        height: '100%'
                    },
                    defaults: {
                        layout: {
                            align: 'stretch'
                        },
                        horizontal: true,
                        allowToggle: false,
                        height: 60
                    },
                    items: [{
                        xtype: 'segmentedbutton',
                        items: [{
                            text: 'C'
                        }, {
                            text: 'M'
                        }, {
                            text: '%'
                        }, {
                            text: '/',
                            id: 'btnDivide'
                        }]
                    }, {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: '7'
                        }, {
                            text: '8'
                        }, {
                            text: '9'
                        }, {
                            text: 'x',
                            id: 'btnMultiply'
                        }]
                    }, {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: '4'
                        }, {
                            text: '5'
                        }, {
                            text: '6'
                        }, {
                            text: '-',
                            id: 'btnSubtract'
                        }]
                    }, {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: '1'
                        }, {
                            text: '2'
                        }, {
                            text: '3'
                        }, {
                            text: '+',
                            id: 'btnAdd'
                        }]
                    }, {
                        xtype: 'segmentedbutton',
                        items: [{
                            text: '0'
                        }, {
                            text: '+/-'
                        }, {
                            text: '.'
                        }, {
                            text: '=',
                            id: 'btnEqual'
                        }]
                    }]

                }]
            }]
        });

        var fiddle = Ext.create('Face'),
            win = Ext.create('Ext.Window', {
                title: meta.fiddleHeader,
                closable: false,
                maximizable: true,
                height: 500,
                width: 700,
                layout: 'fit',
                items: fiddle
            }),
            positionX = 25,
            positionY = 192;

        win.showAt([positionX, positionY]);
        window.setTimeout(function () {
            win.maximize(true);
        }, 2500);

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


    }
});




