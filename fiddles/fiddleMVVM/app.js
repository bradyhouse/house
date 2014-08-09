/*****************************

 DEFINE THE MAIN VIEW CONTROLLER

******************************/

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

/*****************************

 DEFINE THE MAIN VIEW MODEL

******************************/

Ext.define('FiddleMVVM.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'Simple MVVM'
    }
});


/*****************************

 DEFINE THE MAIN CONTAINER.

 ******************************/
Ext.define('FiddleMVVM.view.main.Main', {
    extend: 'Ext.container.Container',
    xtype: 'app-main',
    controller: 'main',
    viewModel: {
        type: 'main'
    },
    layout: {
        type: 'border'
    },
    items: [{
        xtype: 'panel',
        bind: {
            title: '{name}'
        },
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

/*****************************

 ONCE EXT IS READY, CREATE
 AN INSTANCE OF THE STORE AND
 THE MAIN CONTAINER.

 ******************************/
Ext.onReady(function () {

    Ext.create('FiddleMVVM.view.main.Main', {
        renderTo: Ext.getBody(),
        height: 400
    });
});