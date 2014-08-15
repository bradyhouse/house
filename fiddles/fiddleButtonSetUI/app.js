Ext.onReady(function() {
    var vMajor = 4;
    try {
        v = Ext.getVersion().parts[0];
    } catch (err) {
        console.log(err.message);
    }
    if (vMajor === 5) {
        Ext.define('MyFiddle.view.MyButton', {
            extend: 'Ext.button.Button',
            alias: 'widget.mybutton',
            enableToggle: true,
            scale: 'large',
            text: 'Not Clicked',
            // <5.0_Required>
            cls: '',
            ui: 'default',
            onRender: function() {
                this.setUI('off');
                this.callParent();
            },
            // </5.0_Required>
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
    } else {
        Ext.define('MyFiddle.view.MyButton', {
            extend: 'Ext.button.Button',
            alias: 'widget.mybutton',
            enableToggle: true,
            ui: 'off',
            scale: 'large',
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
    }
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
});