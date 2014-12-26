Ext.onReady(function() {
    Ext.define('MyFiddle.view.MyButton', {
        extend: 'Ext.button.Button',
        alias: 'widget.mybutton',
        enableToggle: true,
        ui: 'off',
        text: 'Not Clicked',
        onClick: function() {
            var me = this;
            if (me.text === 'Not Clicked') {
                me.setText('Clicked');
                me.setUI('on');
            } else {
                me.setText('Not Clicked');
                me.setUI('off');
            }
        }
    });
    Ext.define("MyFiddle.view.Main", {
        extend: 'Ext.container.Container',
        alias: 'widget.main',
        height: 52,
        layout: {
            type: 'hbox',
            align: 'middle'
        },
        items: [{
            xtype: 'mybutton'
        }]
    });
    Ext.create('MyFiddle.view.Main', {
        renderTo: Ext.getBody()
    });
    var btn = Ext.ComponentQuery.query('mybutton(true)')[0];
    Ext.Msg.alert('mybutton - uiCls', btn.uiCls);
});