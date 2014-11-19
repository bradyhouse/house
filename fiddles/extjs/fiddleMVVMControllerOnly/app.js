Ext.define('FiddleMVVM.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    requires: ['Ext.MessageBox'],

    alias: 'controller.main',

    onClickButton: function () {
        Ext.Msg.confirm('Confirm', 'Are you sure?', 'onConfirm', this);
    },
    onConfirm: function (choice) {
        if (choice === 'yes') {
            Ext.Msg.alert('Alert', 'Goodbye then!');
        }
    }
});

Ext.define('FiddleMVVM.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    controller: 'main',
    layout: {
        type: 'border'
    },
    items: [{
        xtype: 'panel',
        title: 'MVVM Controller Only',
        region: 'north'
    }, {
        type: 'panel',
        region: 'west',
        html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
        width: 250,
        split: true,
        tbar: [{
            text: 'Button',
            handler: 'onClickButton'
        }]
    }, {
        region: 'center',
        xtype: 'tabpanel',
        items: [{
            title: 'Tab 1',
            html: '<h2>Content appropriate for the current navigation.</h2>'
        }]
    }]
});

Ext.onReady(function () {

    Ext.create('FiddleMVVM.view.main.Main', {
        renderTo: Ext.getBody(),
        height: 400
    });
});